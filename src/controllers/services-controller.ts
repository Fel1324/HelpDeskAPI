import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";

export class ServicesController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z
        .string("Título do serviço é obrigatório!")
        .trim()
        .min(2, "O título do serviço deve ter pelo menos 2 caracteres!"),
      price: z
        .number("Preço do produto é obrigatório!")
        .positive("O preço precisa ser maior do que zero!"),
    });

    const { title, price } = bodySchema.parse(req.body);

    if (!req.user) {
      throw new AppError("Não autorizado!", 401);
    }

    const service = await prisma.service.create({
      data: {
        title,
        price,
        createdBy: req.user.id,
      },
    });

    res.status(201).json(service);
    return;
  }
}
