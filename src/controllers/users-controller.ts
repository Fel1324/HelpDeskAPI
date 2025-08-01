import { Request, Response } from "express";
import { UserRole } from "@prisma/client";
import { hash } from "bcrypt";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";

const { admin, customer, technician } = UserRole;

export class UsersController {
  async create(req: Request, res: Response) {
    const userRoles = req.user ? [technician] : [admin, customer, technician]
    const userRoleDefault = req.user ? technician : customer
    const userRolesMessage = req.user ? "Opção disponível: technician" : "Opções disponíveis: admin, customer, technician"

    const bodySchema = z.object({
      name: z
        .string("Nome é obrigatório")
        .trim()
        .min(2, "Nome deve conter pelo menos 2 caracteres!"),
      email: z
        .email("E-mail inválido, siga o modelo: email@example.com")
        .toLowerCase(),
      password: z
        .string("Senha é obrigatória")
        .min(6, "Senha deve conter pelo menos 6 caracteres"),
      role: z
        .enum(
          userRoles,
          userRolesMessage
        )
        .default(userRoleDefault),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new AppError(
        "E-mail inválido! Já existe um usuário com este e-mail!",
        409
      );
    }

    const hashedPassword = await hash(password, 10);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role,
      },
    });

    const { password: _, ...userWithoutPassword } = user;

    res.status(201).json(userWithoutPassword);
    return;
  }
}
