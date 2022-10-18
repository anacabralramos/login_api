import { Router } from "express";
import controller from "./controller";
import signinMiddleware from "./middlewares/signinMiddleware";
import signupMiddleware from "./middlewares/signupMiddleware";

const routes = Router();

// Cadastro
routes.post("/signup", signupMiddleware.signup, controller.signup);
// Login
routes.post("/signin", signinMiddleware.signin, controller.signin);
// Profile

routes.get("/profile", controller.getProfile); //recuperar dados de um perfil

export { routes };
