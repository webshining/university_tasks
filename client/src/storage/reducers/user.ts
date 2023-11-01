import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { decodeToken } from "react-jwt";
import { authHost, host } from "../../actions/fetch";
import { User, UserAuthBody, UserPayload, UserState, UserUpdateBody } from "../../types/users";

const defaultState: UserState = {
	user: null,
	isLoading: true,
	error: null,
};

export const getUser = (accessToken: string): User => {
	const decode: any = decodeToken(accessToken);
	return decode as User;
};

const refreshUser = createAsyncThunk("user/refresh", async (): Promise<UserPayload> => {
	const { data } = await host.get("/users/refresh");
	if (data.error) {
		localStorage.removeItem("accessToken");
		return { user: null, error: data.error };
	}
	localStorage.setItem("accessToken", data.accessToken);
	return { user: getUser(data.accessToken), error: null };
});

const loginUser = createAsyncThunk("user/login", async (user: UserAuthBody): Promise<UserPayload> => {
	const { data } = await host.post("/users", user);
	if (data.accessToken) {
		localStorage.setItem("accessToken", data.accessToken);
		return { user: getUser(data.accessToken), error: null };
	}
	return { user: null, error: data.error };
});

const updateUser = createAsyncThunk("user/update", async (user: UserUpdateBody): Promise<UserPayload> => {
	const { data } = await authHost.put("/users", user);
	if (data.accessToken) {
		localStorage.setItem("accessToken", data.accessToken);
		return { user: getUser(data.accessToken), error: null };
	}
	return { user: null, error: data.error };
});

const logoutUser = createAsyncThunk("user/logout", async (): Promise<UserPayload> => {
	await host.get("/users/logout");
	localStorage.removeItem("accessToken");
	return { user: null, error: null };
});

const deleteUser = createAsyncThunk("user/delete", async (): Promise<UserPayload> => {
	await host.delete("/users");
	localStorage.removeItem("accessToken");
	return { user: null, error: null };
});

export const userSlice = createSlice({
	name: "user",
	initialState: defaultState,
	reducers: {
		setUser: (state: UserState, action: PayloadAction<User | null>) => {
			state.user = action.payload;
			state.isLoading = false;
			state.error = null;
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(refreshUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(refreshUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			})
			.addCase(loginUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(loginUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			})
			.addCase(logoutUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(logoutUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			})
			.addCase(updateUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(updateUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.error = action.payload.error;
			})
			.addCase(deleteUser.pending, (state: UserState) => {
				state.isLoading = true;
			})
			.addCase(deleteUser.fulfilled, (state: UserState, action: PayloadAction<UserPayload>) => {
				state.isLoading = false;
				state.user = action.payload.user;
				state.error = action.payload.error;
			});
	},
});

export const userActions = { ...userSlice.actions, refreshUser, loginUser, logoutUser, updateUser, deleteUser };
export default userSlice.reducer;