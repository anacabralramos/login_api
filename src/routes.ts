import { Router } from "express";
import controller from "./controller";
import { authMiddleware } from "./middlewares/authMiddleware";
import signinMiddleware from "./middlewares/signinMiddleware";
import signupMiddleware from "./middlewares/signupMiddleware";

const routes = Router();

// Cadastro
routes.post("/signup", signupMiddleware.signup, controller.signup);
// Login
routes.post("/signin", signinMiddleware.signin, controller.signin);
// Profile
routes.get("/profile", authMiddleware, controller.getProfile); //recuperar dados de um perfil

export { routes };
