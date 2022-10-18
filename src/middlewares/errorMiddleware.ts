import { NextFunction, Request, Response } from "express";

const errorHandler = (
  error: any,
  _req: Request,
  res: Response,
  _next: NextFunction
) => {
  // console.log("midleErro");

  const status = res.locals.status && 500;
  console.log(res.locals.message);

  const message = res.locals.message
    ? res.locals.message
    : "Internal Server Error";

  const stack = error.stack;

  res.status(status).json({ message, stack });
};

export default { errorHandler };
