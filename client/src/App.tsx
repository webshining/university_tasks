import { useEffect } from "react";
import { isExpired } from "react-jwt";
import { Route, Routes } from "react-router-dom";
import { useActions } from "./actions/redux";
import Notifications from "./components/Notifications";
import Auth from "./pages/Auth";
import Users from "./pages/Users";

function App() {
	const { refreshUser } = useActions();
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) if (isExpired(token)) refreshUser();
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
