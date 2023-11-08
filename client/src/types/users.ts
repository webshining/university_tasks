export interface User {
	id: number;
	name: string;
	email: string;
	isConfirmed: boolean;
	created_at: string;
	updated_at: string;
}

export interface UserPayload {
	user: User | null;
	error: string | null;
}

export interface UserState {
	user: User | null;
	isLoading: boolean;
	error: string | null;
}

export interface UserAuthBody {
	name: string;
	email: string;
	password: string;
}

export interface UserUpdateBody {
	name?: string;
	email?: string;
	previouspassword?: string;
	newpassword?: string;
}

export interface UsersState {
	users: User[];
}
