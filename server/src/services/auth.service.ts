import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { ACCESS_TOKEN_EXPIRE_MINUTES, ACCESS_TOKEN_SECRET_KEY, REFRESH_TOKEN_EXPIRE_MINUTES } from "../data/config";
import client from "../rd";
import { REFRESH_TOKEN_SECRET_KEY } from "./../data/config";

class AuthService {
	generateTokens = async (
		accessPayload: any,
		refreshPayload?: any
	): Promise<{ accessToken: string; refreshToken: string }> => {
		refreshPayload = refreshPayload ? refreshPayload : accessPayload;
		const accessToken = jwt.sign(accessPayload, ACCESS_TOKEN_SECRET_KEY, {
			algorithm: "HS256",
			expiresIn: ACCESS_TOKEN_EXPIRE_MINUTES * 60,
		});
		const refreshToken = jwt.sign(refreshPayload, REFRESH_TOKEN_SECRET_KEY, {
			algorithm: "HS256",
			expiresIn: REFRESH_TOKEN_EXPIRE_MINUTES * 60,
		});
		await this.saveToken(refreshToken, REFRESH_TOKEN_EXPIRE_MINUTES * 60);
		return { accessToken, refreshToken };
	};

	saveToken = async (token: string, ex: number) => {
		await client.connect();
		await client.set(token, "token", { EX: ex });
		await client.disconnect();
	};

	removeToken = async (token: string) => {
		await client.connect();
		await client.del(token);
		await client.disconnect();
	};

	tokenDecode = async (token: string, refresh: boolean = false): Promise<any | null> => {
		let decode = null;
		try {
			decode = jwt.verify(token, refresh ? REFRESH_TOKEN_SECRET_KEY : ACCESS_TOKEN_SECRET_KEY, {
				algorithms: ["HS256"],
			});
		} catch (e) {}
		return decode;
	};

	isTokenExists = async (token: string): Promise<boolean> => {
		await client.connect();
		const exists = await client.exists(token);
		await client.disconnect();
		return Boolean(exists);
	};

	hashPass = async (password: string): Promise<string> => {
		return bcrypt.hash(password, 7);
	};

	comparePass = async (password: string, encrypted: string): Promise<boolean> => {
		return bcrypt.compare(password, encrypted);
	};
}

export default AuthService;
