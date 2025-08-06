import { Request, Response } from "express";

export class ServicesController {
  async create(req: Request, res: Response) {
    res.status(201).json({ message: "ok" });
    return;
  }
}
