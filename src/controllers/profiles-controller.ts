import { Request, Response } from "express-serve-static-core";
import { z } from "zod";

import { AppError } from "@/utils/app-error";
import { prisma } from "@/database/prisma";

export class ProfilesController {
  async show(req: Request, res: Response) {
    if (!req.user) {
      throw new AppError("Usuário não autenticado!", 401);
    }

    const paramsSchema = z.object({
      id: z.uuid("Id inválido!"),
    });

    const { id } = paramsSchema.parse(req.params);

    const user = await prisma.user.findUnique({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError("Usuário não encontrado!", 404);
    }

    if (req.user.id !== user.id) {
      throw new AppError("Não autorizado a acessar esse perfil!", 403);
    }

    res.json(user);
    return;
  }

  // async update(req: Request, res: Response){

  // }
}
