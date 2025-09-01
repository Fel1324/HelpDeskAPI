import { Request, Response } from "express";
import { z } from "zod";

import { prisma } from "@/database/prisma";
import { AppError } from "@/utils/app-error";

export class AdditionalsServicesController {
  async create(req: Request, res: Response) {
    if (!req.user || req.user.role !== "technician") {
      throw new AppError("Não autorizado", 401);
    }

    const paramSchema = z.object({
      ticketId: z.uuid("Id inválido!"),
    });

    const { ticketId } = paramSchema.parse(req.params);

    const ticket = await prisma.ticket.findUnique({
      where: {
        id: ticketId,
        assignedTo: req.user.id,
      },
    });

    if (!ticket) {
      throw new AppError("Chamado não encontrado!", 404);
    }

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

    const additionalService = await prisma.service.create({
      data: {
        title,
        price,
        createdBy: req.user.id,
        serviceTickets: {
          create: {
            ticketId,
            isAdditional: true,
          },
        },
      },
    });

    res.status(201).json(additionalService);
    return;
  }
}
