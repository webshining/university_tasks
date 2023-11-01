import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../actions/redux";
import NavBar from "../components/NavBar";
import UsersTable from "../components/UsersTable";

const Users = () => {
	const navigate = useNavigate();
	const { isLoading, user } = useAppSelector((state) => state.user);
	useEffect(() => {
		if (!isLoading && !user) navigate("/auth");
	}, [isLoading, user]);
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
