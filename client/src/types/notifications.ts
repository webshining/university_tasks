export interface Notification {
	id: string;
	text: string;
}

export interface NotificationPayload {
	text: string;
}

export interface NotificationsState {
	notifications: Notification[];
}
