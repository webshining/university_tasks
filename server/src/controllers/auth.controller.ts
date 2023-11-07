import { CookieOptions, Request, Response } from "express";
import { REFRESH_TOKEN_EXPIRE_MINUTES } from "../data/config";
import { LoginUserDto, RegisterUserDto } from "../dto/users.dto";
import AuthService from "../services/auth.service";
import MailService from "../services/main.service";
import UserService from "../services/user.service";

class AuthController {
	private authService = new AuthService();
	private userService = new UserService();
	private mailService = new MailService();
	private readonly cookieOptions: CookieOptions = {
		maxAge: REFRESH_TOKEN_EXPIRE_MINUTES * 60 * 1000,
		httpOnly: true,
		sameSite: "none",
		secure: true,
	};

	login = async (req: Request<{}, {}, LoginUserDto>, res: Response) => {
		const { email, password } = req.body;
		const user = await this.userService.getOne({ email });
		if (!user) return res.json({ error: "incorrect credentials" });
		const comparePass = await this.authService.comparePass(password, user.password);
		if (!comparePass) return res.json({ error: "incorrect credentials" });
		const { refreshToken, accessToken } = await this.authService.generateTokens(user.toJSON(), { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	register = async (req: Request<{}, {}, RegisterUserDto>, res: Response) => {
		const { name, email, password } = req.body;
		const candidate = await this.userService.getOne({ email });
		if (candidate) return res.json({ error: "user with this email is already exists" });
		const hashPass = await this.authService.hashPass(password);
		const user = await this.userService.create({ name, email, password: hashPass });
		const { refreshToken, accessToken } = await this.authService.generateTokens(user.toJSON(), { id: user.id });
		await this.mailService.sendConfirmationMail(user.email, user.confirmationLink);
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
		const { accessToken, refreshToken } = await this.authService.generateTokens(user.toJSON(), { id: user.id });
		return res.cookie("refreshToken", refreshToken, this.cookieOptions).json({ accessToken });
	};

	logout = async (req: Request, res: Response) => {
		const token = req.cookies["refreshToken"];
		if (token) {
			await this.authService.removeToken(token);
			res.clearCookie("refreshToken", { ...this.cookieOptions, maxAge: 0 });
		}
		return res.send();
	};
}

export default new AuthController();
