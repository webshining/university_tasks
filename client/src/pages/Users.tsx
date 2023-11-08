import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../actions/redux";
import UsersTable from "../components/UsersTable";

const Users = () => {
	const { isLoading, user } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoading && !user) {
			document.querySelector(".users")?.classList.add("disappearance");
			setTimeout(() => {
				navigate("/auth");
			}, 800);
		}
	}, [isLoading, user]);
	return (
		<div className="users">
			<UsersTable />
		</div>
	);
};

export default Users;
