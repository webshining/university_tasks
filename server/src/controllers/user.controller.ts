import { Request, Response } from "express";
import { UpdateUserDto } from "../dto/users.dto";
import AuthService from "../services/auth.service";
import MailService from "../services/main.service";
import UserService from "../services/user.service";

class UserController {
	private userService = new UserService();
	private authService = new AuthService();
	private mailService = new MailService();

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

	update = async (req: Request<{}, {}, UpdateUserDto>, res: Response) => {
		const user = (req as any).user;
		const { name, email, previouspassword, newpassword } = req.body;
		let data: any = {};
		let message = "ok";
		if (name) data["name"] = name;
		if (previouspassword && newpassword) {
			const comparePass = await this.authService.comparePass(previouspassword, user.password);
			if (!comparePass) return res.json({ error: "incorrect password" });
			data["password"] = await this.authService.hashPass(newpassword);
		}
		if (email && user.email !== email) {
			const candidate = await this.userService.getOne({ email });
			if (candidate && candidate.id !== user.id) {
				return res.json({ error: "user with this email is already exists" });
			} else {
				data["email"] = email;
				data["isConfirmed"] = false;
				message = "we have sent you a confirmation email";
				await this.mailService.sendConfirmationMail(email, user.confirmationLink);
			}
		}
		await this.userService.update(user, data);
		return res.json({ message });
	};
}

export default new UserController();
