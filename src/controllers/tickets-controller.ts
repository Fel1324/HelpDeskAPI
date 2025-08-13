import { Request, Response } from "express";
import { z } from "zod";

import { TicketStatus } from "@prisma/client";
import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";

const { aberto, emAtendimento, encerrado } = TicketStatus;

export class TicketsController {
  async create(req: Request, res: Response) {
    const bodySchema = z.object({
      title: z
        .string("Título do chamado é obrigatório")
        .trim()
        .min(2, "Título do chamado deve conter pelo menos 2 caracteres!"),
      description: z
        .string("Descrição do chamado é obrigatória")
        .trim()
        .min(10, "Descrição do chamado deve conter pelo menos 10 caracteres!"),
      serviceId: z.uuid("Id inválido!"),
    });

    const { title, description, serviceId } = bodySchema.parse(req.body);

    if (!req.user) {
      throw new AppError("Usuário não autenticado!", 401);
    }

    const createdBy = req.user.id;

    const service = await prisma.service.findUnique({
      where: {
        id: serviceId,
      },
    });

    if (!service) {
      throw new AppError("Serviço não encontrado!", 404);
    }

    const date = new Date();
    console.log(date);

    res.status(201).json({ message: "ok" });
    return;
  }
}
