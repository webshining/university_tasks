import { Router } from "express";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
const router = Router();

router.get("/", AuthMiddleware, UserController.many);
router.post("/", UserController.getOrCreate);
router.delete("/", AuthMiddleware, UserController.delete);
router.put("/", AuthMiddleware, UserController.update);
router.get("/refresh", UserController.refresh);
router.get("/logout", UserController.logout);

export default router;
