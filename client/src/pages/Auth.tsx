import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppSelector } from "../actions/redux";
import AuthForm from "../components/AuthForm";
import "../styles/auth.scss";

const Auth = () => {
	const { user, isLoading } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoading && user) {
			document.querySelector(".auth")?.classList.add("disappearance");
			setTimeout(() => {
				navigate("/");
			}, 800);
		}
	}, [user, isLoading]);
	return (
		<div className="auth">
			<AuthForm />
		</div>
	);
};

export default Auth;
