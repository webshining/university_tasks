import { Router } from "express";
import { param } from "express-validator";
import UserController from "../controllers/user.controller";
import AuthMiddleware from "../middlewares/auth.middleware";
import ErrorMiddleware from "../middlewares/error.middleware";
const router = Router();

const idParamValidation = [param("id").isNumeric().withMessage("not valid id"), ErrorMiddleware];
const linkParamValidation = [param("link").isString().withMessage("not valid link"), ErrorMiddleware];

router.get("/", AuthMiddleware, UserController.many);
router.get("/:id", AuthMiddleware, idParamValidation, UserController.one);
router.get("/confirm/:link", linkParamValidation, UserController.confirm);

export default router;
