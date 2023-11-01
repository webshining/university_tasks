import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { v4 } from "uuid";
import { NotificationPayload, NotificationsState } from "../../types/notifications";

const defaultState: NotificationsState = {
	notifications: [],
};

export const notificationsSlice = createSlice({
	name: "notifications",
	initialState: defaultState,
	reducers: {
		addNotification: (state: NotificationsState, action: PayloadAction<NotificationPayload>) => {
			state.notifications = [{ ...action.payload, id: v4() }, ...state.notifications];
		},
		removeNotification: (state: NotificationsState, action: PayloadAction<string>) => {
			state.notifications = state.notifications.filter((n) => n.id !== action.payload);
		},
	},
});

export const notificationsActions = notificationsSlice.actions;
export default notificationsSlice.reducer;
