import { useState } from "react";
import { useActions } from "../actions/redux";
import { UserAuthBody } from "../types/users";

const AuthForm = () => {
	const [values, setValues] = useState<UserAuthBody>({ email: "", password: "" });
	const { loginUser, addNotification } = useActions();
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { payload } = (await loginUser(values)) as any;
		if (payload.error) addNotification({ text: payload.error });
	};
	const onChange = (e: any) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	return (
		<form onSubmit={onSubmit}>
			<input type="email" name="email" placeholder="Email" value={values.email} onChange={onChange} required />
			<input
				type="password"
				name="password"
				placeholder="Password"
				value={values.password}
				onChange={onChange}
				required
			/>
			<button type="submit">Auth</button>
		</form>
	);
};

export default AuthForm;
