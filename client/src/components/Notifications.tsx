import { useAppSelector } from "../actions/redux";
import "../styles/notifications.scss";
import NotificationsItem from "./NotificationsItem";

const Notifications = () => {
	const { notifications } = useAppSelector((state) => state.notifications);
	return (
		<div className="notifications">
			{notifications.map((n) => (
				<NotificationsItem key={n.id} {...n} />
			))}
		</div>
	);
};

export default Notifications;
