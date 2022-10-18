import { NextFunction, Request, Response } from "express";
import repository from "../repository";
import jwt from "jsonwebtoken";
import * as bcrypt from "bcrypt";
import { signinSchema } from "./validationSignin";

class signinMiddleware {
  public async signin(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const profile = request.body;
      await signinSchema.validate(profile);
      next();
    } catch (error: any) {
      response.locals.status = 400;
      response.locals.message = error.message;
      next(error);
    }
  }
}

export default new signinMiddleware();
