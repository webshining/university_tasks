import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../actions/redux";
import NavBar from "../components/NavBar";
import UsersTable from "../components/UsersTable";

const Users = () => {
	const { user, isLoading } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoading && !user) navigate("/auth");
	}, [user, isLoading]);
	return (
		<>
			<NavBar />
			<div className="users">
				<UsersTable />
			</div>
		</>
	);
};

export default Users;
