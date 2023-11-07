import { Request, Response } from "express";
import UserService from "../services/user.service";

class UserController {
	private userService = new UserService();

	many = async (req: Request, res: Response) => {
		const users = await this.userService.getMany();
		return res.json({ users: users.map((u) => u.toJSON()) });
	};

	one = async (req: Request<{ id: number }>, res: Response) => {
		const user = await this.userService.getOne({ id: req.params.id });
		if (!user) return res.json({ error: "user is not found" });
		return res.json({ user: user.toJSON() });
	};

	confirm = async (req: Request<{ link: string }>, res: Response) => {
		const user = await this.userService.getOne({ confirmationLink: req.params.link });
		if (!user) return res.json({ error: "invalid link" });
		await this.userService.update(user, { isConfirmed: true });
		return res.json({ message: "ok" });
	};
}

export default new UserController();
