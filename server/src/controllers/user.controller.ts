import { CookieOptions, Request, Response } from "express";
import { REFRESH_TOKEN_EXPIRE_MINUTES } from "../data/config";
import { CreateUserDto, UpdateUserDto } from "../dto/users.dto";
import AuthService from "../services/auth.service";
import UserService from "../services/user.service";

class UserController {
	private userService = new UserService();
	private authService = new AuthService();
	private readonly cookieOptions: CookieOptions = {
		maxAge: REFRESH_TOKEN_EXPIRE_MINUTES * 60 * 1000,
		httpOnly: true,
		sameSite: "none",
		secure: true,
	};

	many = async (req: Request, res: Response) => {
		const users = await this.userService.getMany();
		return res.json({ users: users.map((u) => u.toJSON()) });
	};

	getOrCreate = async (req: Request<{}, {}, CreateUserDto>, res: Response) => {
		const { email, password } = req.body;
		let user = await this.userService.getOne({ email });
		if (!user) {
			const hashPass = await this.authService.hashPass(password);
			user = await this.userService.create({ email, password: hashPass });
		} else {
			const comparePass = await this.authService.comparePass(password, user.password);
			if (!comparePass) return res.json({ error: "incorrect password" });
		}
		const { accessToken, refreshToken } = await this.authService.generateTokens(user.toJSON(), { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	delete = async (req: Request, res: Response) => {
		let user: any = (req as any).user;
		await this.userService.delete({ id: user.id });
		const token = req.cookies["refreshToken"];
		if (token) {
			await this.authService.removeToken(token);
			res.clearCookie("refreshToken", { ...this.cookieOptions, maxAge: 0 });
		}
		return res.json({ message: "ok" });
	};

	update = async (req: Request<{}, {}, UpdateUserDto>, res: Response) => {
		let user: any = (req as any).user;
		const { name, email } = req.body;
		const candidate = await this.userService.getOne({ email });
		if (candidate && user.id !== candidate.id) return res.json({ error: "user with this email already exists" });
		user = await this.userService.update(user, { name, email });
		const { accessToken, refreshToken } = await this.authService.generateTokens(user.toJSON(), { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	refresh = async (req: Request, res: Response) => {
		const token = req.cookies["refreshToken"];
		if (!token) return res.json({ error: "unauthorized" });
		if (!(await this.authService.isTokenExists(token))) return res.json({ error: "unauthorized" });
		const refresh: any = await this.authService.tokenDecode(token, true);
		await this.authService.removeToken(token);
		if (!refresh) return res.json({ error: "unauthorized" });
		const user = await this.userService.getOne({ id: refresh.id });
		if (!user) return res.json({ error: "unauthorized" });
		const { accessToken, refreshToken } = await this.authService.generateTokens(
			{ user: user.toJSON() },
			{ id: user.id }
		);
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	logout = async (req: Request, res: Response) => {
		const token = req.cookies["refreshToken"];
		if (token) {
			await this.authService.removeToken(token);
			res.clearCookie("refreshToken", { ...this.cookieOptions, maxAge: 0 });
		}
		return res.json({ message: "ok" });
	};
}

export default new UserController();
