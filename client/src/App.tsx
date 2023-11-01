import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { Route, Routes } from "react-router-dom";
import { useActions, useAppSelector } from "./actions/redux";
import Notifications from "./components/Notifications";
import Auth from "./pages/Auth";
import Users from "./pages/Users";
import { getUser } from "./storage/reducers/user";

function App() {
	const { isLoading, user } = useAppSelector((state) => state.user);
	const { refreshUser, setUser } = useActions();
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			if (isExpired(token)) refreshUser();
			else setUser(getUser(token));
		} else {
			setUser(null);
		}
	}, []);
	return (
		<>
			<Notifications />
			<Routes>
				<Route path="/" element={<Users />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</>
	);
}

export default App;
