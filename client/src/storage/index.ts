import { configureStore } from "@reduxjs/toolkit";
import { usersAPI } from "./api/user";
import notificationsReducer, { notificationsActions } from "./reducers/notifications";
import userReducer, { userActions } from "./reducers/user";

export const store = configureStore({
	reducer: {
		user: userReducer,
		notifications: notificationsReducer,
		[usersAPI.reducerPath]: usersAPI.reducer,
	},
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(usersAPI.middleware),
});

export const storeActions = { ...userActions, ...notificationsActions };
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
