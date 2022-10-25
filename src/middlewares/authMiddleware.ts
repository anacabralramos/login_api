import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import repository from "../repository";

interface UserPayload {
  id: string;
}

export const authMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    // verifica só o token
    const { authorization } = req.headers;

    if (!authorization || authorization.length < 7) {
      throw { message: `Ops! Não autorizado 'o'` };
    }

    const token = authorization.split(" ")[1];

    const { id } = jwt.verify(token, process.env.JWT_PASS ?? "") as UserPayload;
    res.locals.id = id;

    next();
  } catch (error: any) {
    res.locals.status = 401;
    res.locals.message = error.message;

    next(error);
  }
};
