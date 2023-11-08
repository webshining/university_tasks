import { useEffect } from "react";
import { decodeToken } from "react-jwt";
import { Route, Routes } from "react-router-dom";
import { useActions } from "./actions/redux";
import NavBar from "./components/NavBar";
import Notifications from "./components/Notifications";
import Auth from "./pages/Auth";
import Confirm from "./pages/Confirm";
import Profile from "./pages/Profile";
import Users from "./pages/Users";

function App() {
	const { setUser } = useActions();
	useEffect(() => {
		const token = localStorage.getItem("accessToken");
		if (token) {
			setUser(decodeToken(token));
		} else setUser(null);
	}, []);
	return (
		<>
			<Notifications />
			<Routes>
				<Route element={<NavBar />}>
					<Route path="/" element={<Users />} />
					<Route path="/users/:id" element={<Profile />} />
				</Route>
				<Route path="/users/confirm/:link" element={<Confirm />} />
				<Route path="/auth" element={<Auth />} />
			</Routes>
		</>
	);
}

export default App;
