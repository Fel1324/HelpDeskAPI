import { Request, Response } from "express";
import { prisma } from "@/database/prisma";
import { UserRole } from "@prisma/client";
import { hash } from "bcrypt";
import { z } from "zod";

import { AppError } from "@/utils/app-error";

const { admin, customer, technician } = UserRole;

export class UsersController {
  async create(req: Request, res: Response) {
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
          [admin, customer, technician],
          "Opções disponíveis: admin, customer, technician"
        )
        .default(customer),
    });

    const { name, email, password, role } = bodySchema.parse(req.body);

    const userWithSameEmail = await prisma.user.findFirst({
      where: { email },
    });

    if (userWithSameEmail) {
      throw new AppError(
        "E-mail inválido! Já existe um usuário com este e-mail!"
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
