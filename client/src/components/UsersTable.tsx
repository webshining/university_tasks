import { useEffect } from "react";
import { useGetUsersQuery } from "../storage/api/user";
import "../styles/users.scss";

const UsersTable = () => {
	const { data, refetch } = useGetUsersQuery();
	useEffect(() => {
		refetch();
	}, []);
	return (
		<div className="users__items">
			{data?.users &&
				data.users.map((l) => (
					<div className="users__item" key={l.id}>
						<div className="users__item_id">
							<span>id: </span>
							{l.id}
						</div>
						<div className="users__item_name">
							<span>name: </span>
							{l.name || "Null"}
						</div>
						<div className="users__item_email">
							<span>email: </span>
							{l.email}
						</div>
						<div className="users__item_createdat">
							<span>createdAt: </span>
							{new Date(l.created_at).toISOString().split("T")[0]}
						</div>
						<div className="users__item_updatedat">
							<span>updatedAt: </span>
							{new Date(l.updated_at).toISOString().split("T")[0]}
						</div>
					</div>
				))}
		</div>
	);
};

export default UsersTable;
