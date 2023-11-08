export interface CreateUserDto {
	name: string;
	email: string;
	password: string;
}

export interface LoginUserDto {
	email: string;
	password: string;
}

export interface RegisterUserDto {
	name: string;
	email: string;
	password: string;
}

export interface UpdateUserDto {
	name?: string;
	email?: string;
	previouspassword?: string;
	newpassword?: string;
}
