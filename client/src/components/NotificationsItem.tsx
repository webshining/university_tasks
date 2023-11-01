import { useEffect, useState } from "react";
import { useActions } from "../actions/redux";
import { Notification } from "../types/notifications";

const NotificationsItem = (props: Notification) => {
	const [exit, setExit] = useState<boolean>(false);
	const { removeNotification } = useActions();
	useEffect(() => {
		setTimeout(() => {
			setExit(true);
		}, 5000);
		setTimeout(() => {
			removeNotification(props.id);
		}, 5800);
	}, []);
	return <div className={`notifications__item ${exit ? "disappearance" : ""}`}>{props.text}</div>;
};

export default NotificationsItem;
