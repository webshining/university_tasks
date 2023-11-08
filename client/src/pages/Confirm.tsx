import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { host } from "../actions/fetch";
import { useActions } from "../actions/redux";

const Confirm = () => {
	const { link } = useParams();
	const { addNotification } = useActions();
	const navigate = useNavigate();
	useEffect(() => {
		host.get("/users/confirm/" + link).then(({ data }) => {
			if (data.error) addNotification({ text: data.error });
			else addNotification({ text: data.message });
		});
		navigate("/");
	}, []);
	return <></>;
};

export default Confirm;
