import { useEffect, useState } from "react";
import { authHost } from "../actions/fetch";
import { useActions, useAppSelector } from "../actions/redux";
import { User, UserUpdateBody } from "../types/users";

const ProfileForm = (props: User) => {
	const { addNotification } = useActions();
	const { user } = useAppSelector((state) => state.user);
	const [values, setValues] = useState<UserUpdateBody>({
		name: props.name,
		email: props.email,
		previouspassword: "",
		newpassword: "",
	});
	const [isEditable, setIsEditable] = useState<boolean>(false);
	useEffect(() => {
		if (user && user.id == props.id) setIsEditable(true);
	}, [user, props]);
	const onChange = (e: any) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { data } = await authHost.put("/users", values);
		addNotification({ text: data.error || data.message });
	};
	return (
		<form onSubmit={onSubmit}>
			<div className="profile__form">
				<div className="profile__form_wrap">
					<p>Name:</p>
					<input
						type="text"
						name="name"
						placeholder="Name"
						value={values.name}
						onChange={onChange}
						readOnly={!isEditable}
					/>
					<p>Email:</p>
					<input
						type="email"
						name="email"
						placeholder="Email"
						value={values.email}
						onChange={onChange}
						readOnly={!isEditable}
					/>
				</div>
				<div className="profile__form_wrap">
					<p>Previous password:</p>
					<input
						type="password"
						name="previouspassword"
						placeholder="Previous password"
						value={values.previouspassword}
						onChange={onChange}
						readOnly={!isEditable}
					/>
					<p>New password:</p>
					<input
						type="password"
						name="newpassword"
						placeholder="New password"
						value={values.newpassword}
						onChange={onChange}
						readOnly={!isEditable}
					/>
				</div>
			</div>
			<button type="submit">
				<span className="material-symbols-outlined">save</span>
			</button>
		</form>
	);
};

export default ProfileForm;
