import { Request, Response } from "express";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

export default async (req: Request, res: Response, next: any) => {
	const authService = new AuthService();
	const userService = new UserService();

	const authorization: string | undefined = req.headers.authorization;
	if (!authorization || !authorization.startsWith("Bearer")) return res.json({ error: "unauthorized" });
	const accessData = await authService.tokenDecode(authorization.split(" ")[1]);
	if (!accessData) return res.json({ error: "unauthorized" });
	const user = await userService.getOne({ id: accessData.id });
	if (!user) return res.json({ error: "user not found" });
	(req as any).user = user;
	next();
};
