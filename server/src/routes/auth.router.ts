import { Router } from "express";
import { body } from "express-validator";
import AuthController from "../controllers/auth.controller";
import ErrorMiddleware from "../middlewares/error.middleware";
const router = Router();

const loginValidation = [
	body("email").notEmpty().withMessage("email is required").isEmail().withMessage("not valid email"),
	body("password")
		.notEmpty()
		.withMessage("password is required")
		.isLength({ min: 6, max: 17 })
		.withMessage("isLength {min: 6, max: 17}"),
	ErrorMiddleware,
];

const registerValidation = [
	body("name")
		.notEmpty()
		.withMessage("name is required")
		.isLength({ min: 3, max: 15 })
		.withMessage("isLength {min: 3, max: 15}"),
	...loginValidation,
];

router.post("/login", loginValidation, AuthController.login);
router.post("/register", registerValidation, AuthController.register);
router.get("/refresh", AuthController.refresh);
router.get("/logout", AuthController.logout);

export default router;
