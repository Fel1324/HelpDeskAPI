import { Request, Response } from "express";
import { hash } from "bcrypt";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";

const COMERCIAL_TIME = [2, 3, 4, 5, 8, 9, 10, 11];

export class TechniciansController {
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
      timeIds: z.array(z.int()),
    });

    const { name, email, password, timeIds } = bodySchema.parse(req.body);

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

    if (!timeIds.length) {
      timeIds.push(...COMERCIAL_TIME);
    }

    const tech = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        role: "technician",
        TechnicianTimes: {
          createMany: {
            data: timeIds.map((id) => ({
              timeId: id,
            })),
          },
        },
      },
    });

    const { password: _, ...techWithoutPassword } = tech;

    res.status(201).json(techWithoutPassword);
    return;
  }
}
