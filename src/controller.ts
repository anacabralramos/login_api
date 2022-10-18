import { NextFunction, Request, Response } from "express";
import errorMiddleware from "./middlewares/errorMiddleware";
import service from "./service";

const signup = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = req.body;
    const result = await service.serviceSignup(profile);
    res.status(200).json(result);
  } catch (error: any) {
    console.log({ error });

    res.locals.status = 409;
    res.locals.message = error.message;

    next(error);
  }
};

const signin = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const profile = req.body;
    const result = await service.serviceSignin(profile);

    res.status(200).json(result);
  } catch (error: any) {
    res.locals.status = 401;
    res.locals.message = error.message;
    next(error);
  }
};

const getProfile = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { authorization } = req.headers;
    const result = await service.profile(authorization);
    console.log(result);

    res.status(200).json(result);
  } catch (error: any) {
    res.locals.status = 401;
    res.locals.message = error.message;
    next(error);
  }
};

export default { signup, signin, getProfile };
