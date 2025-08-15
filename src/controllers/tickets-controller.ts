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
        status: "ativo",
      },
    });

    if (!service) {
      throw new AppError("Serviço não encontrado!", 404);
    }

    const hoursTicket = new Date().getHours();
    const minutesTicket = hoursTicket * 60;

    const technician = await prisma.user.findFirst({
      where: {
        role: "technician",
        technicianTimes: {
          some: {
            time: {
              minutes: {
                equals: minutesTicket,
              },
            },
          },
        },
      },
      orderBy: {
        lastAssignedAt: "asc",
      },
    });

    console.log(technician);

    if (!technician) {
      throw new AppError("Nenhum técnico disponível no momento!", 404);
    }

    await prisma.$transaction(async (tx) => {
      await tx.ticket.create({
        data: {
          title,
          description,
          createdBy,
          assignedTo: technician.id,
          ticketServices: {
            create: {
              serviceId: serviceId,
            },
          },
        },
      });

      await tx.user.update({
        where: {
          id: technician.id,
        },
        data: {
          lastAssignedAt: new Date(),
        },
      });
    });

    res.status(201).json();
    return;
  }
}
