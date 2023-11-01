import { useEffect, useRef, useState } from "react";
import { useActions, useAppSelector } from "../actions/redux";
import { useGetUsersQuery } from "../storage/api/user";
import "../styles/users.scss";
import { User, UserUpdateBody } from "../types/users";

const UsersTable = () => {
	const { data, refetch } = useGetUsersQuery();
	const { updateUser, deleteUser, addNotification } = useActions();
	const { user } = useAppSelector((state) => state.user);
	const [active, setActive] = useState<User | null>(null);
	const [values, setValues] = useState<UserUpdateBody>({ name: "", email: "" });
	const popupRef = useRef<any>(null);
	useEffect(() => {
		refetch();
	}, []);
	useEffect(() => {
		if (active) setValues({ email: active.email, name: active.name });
		else setValues({ name: "", email: "" });
	}, [active]);
	useEffect(() => {
		if (popupRef.current) {
			const onClick = (e: any) => popupRef.current.contains(e.target) || setActive(null);
			document.addEventListener("click", onClick);
			return () => document.removeEventListener("click", onClick);
		}
	}, [popupRef]);
	const onChange = (e: any) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { payload } = (await updateUser(values)) as any;
		if (payload.error) addNotification({ text: payload.error });
		refetch();
	};
	const onDelete = async () => {
		localStorage.removeItem("accessToken");
		document.querySelector(".users")?.classList.add("disappearance");
		setActive(null);
		setTimeout(async () => {
			await deleteUser();
		}, 800);
	};
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
					<div className="users__item" key={l.id} onClick={() => setActive(l)}>
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
			{active && (
				<div className="users__popup">
					<form ref={popupRef} onSubmit={onSubmit}>
						<input
							type="text"
							name="name"
							placeholder="Name"
							value={values.name}
							onChange={onChange}
							readOnly={user?.id === active.id ? false : true}
						/>
						<input
							type="email"
							name="email"
							placeholder="Email"
							value={values.email}
							onChange={onChange}
							readOnly={user?.id === active.id ? false : true}
							required
						/>
						<input type="text" value={active.created_at} readOnly />
						<input type="text" value={active.updated_at} readOnly />
						{user?.id === active.id && (
							<div className="users__popup_buttons">
								<button type="submit">Save</button>
								<button type="button" onClick={onDelete}>
									Delete
								</button>
							</div>
						)}
					</form>
				</div>
			)}
		</>
	);
};

export default UsersTable;
