import { useEffect } from "react";
import { useGetUsersQuery } from "../storage/api/user";
import "../styles/users.scss";

const UsersTable = () => {
	const { data, refetch } = useGetUsersQuery();
	useEffect(() => {
		refetch();
	}, []);
	return (
		<>
			<div className="users__item">
				<div className="users__item_id head">id</div>
				<div className="users__item_name head">name</div>
				<div className="users__item_email head">email</div>
				<div className="users__item_createdat head">created_at</div>
				<div className="users__item_updatedat head">updated_at</div>
			</div>
			{data?.users &&
				data.users.map((l) => (
					<div className="users__item" key={l.id}>
						<div className="users__item_id">{l.id}</div>
						<div className="users__item_name">{l.name || "Null"}</div>
						<div className="users__item_email">{l.email}</div>
						<div className="users__item_createdat">
							{new Date(l.created_at).toISOString().split("T")[0]}
						</div>
						<div className="users__item_updatedat">
							{new Date(l.updated_at).toISOString().split("T")[0]}
						</div>
					</div>
				))}
		</>
	);
};

export default UsersTable;
