import { NextFunction, Request, Response } from "express";
import { signupSchema } from "./validationSignup";
import * as yup from "yup";

class signupMiddleware {
  public async signup(
    request: Request,
    response: Response,
    next: NextFunction
  ) {
    try {
      const profile = request.body;
      await signupSchema.validate(profile);
      next();
    } catch (error) {
      if (error instanceof yup.ValidationError) {
        console.log("mensagem: " + error.message);

        response.locals.status = 400;
        response.locals.message = error.message;
        next(error);
      }
    }
  }
}

export default new signupMiddleware();
