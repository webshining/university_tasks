import { useState } from "react";
import { useActions } from "../actions/redux";
import { UserAuthBody } from "../types/users";

const AuthForm = () => {
	const [isLogin, setIsLogin] = useState<boolean>(true);
	const [values, setValues] = useState<UserAuthBody>({ name: "", email: "", password: "" });
	const { loginUser, registerUser, addNotification } = useActions();
	const onChange = (e: any) => {
		setValues((prev) => ({
			...prev,
			[e.target.name]: e.target.value,
		}));
	};
	const onSubmit = async (e: any) => {
		e.preventDefault();
		const { payload } = (await (isLogin ? loginUser(values) : registerUser(values))) as any;
		if (payload.error) addNotification({ text: payload.error });
	};
	return (
		<form onSubmit={onSubmit}>
			<div className={"auth__form login" + (isLogin ? " active" : "")}>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={values.email}
					onChange={onChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={values.password}
					onChange={onChange}
					required
				/>
				<p onClick={() => setIsLogin(!isLogin)}>Sign Up</p>
				<button type="submit">Log In</button>
			</div>
			<div className={"auth__form register" + (isLogin ? "" : " active")}>
				<input
					type="text"
					name="name"
					placeholder="Name"
					value={values.name}
					onChange={onChange}
					required={!isLogin}
				/>
				<input
					type="email"
					name="email"
					placeholder="Email"
					value={values.email}
					onChange={onChange}
					required
				/>
				<input
					type="password"
					name="password"
					placeholder="Password"
					value={values.password}
					onChange={onChange}
					required
				/>
				<p onClick={() => setIsLogin(!isLogin)}>Log In</p>
				<button type="submit">Sign Up</button>
			</div>
		</form>
	);
};

export default AuthForm;
