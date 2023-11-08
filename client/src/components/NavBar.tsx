import { useEffect, useRef, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useActions, useAppSelector } from "../actions/redux";
import "../styles/navbar.scss";

const NavBar = () => {
	const navbarRef = useRef<any>(null);
	const { user } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	const [active, setActive] = useState<boolean>(false);
	const { logoutUser } = useActions();
	const logout = () => {
		document.querySelector(".navbar")?.classList.add("disappearance");
		document.querySelector(".users")?.classList.add("disappearance");
		document.querySelector(".profile")?.classList.add("disappearance");
		setTimeout(async () => {
			await logoutUser();
			navigate("/auth");
		}, 800);
	};
	const profile = () => {
		document.querySelector(".users")?.classList.add("disappearance");
		setTimeout(() => {
			navigate("/users/" + user?.id);
		}, 800);
	};
	useEffect(() => {
		const onClick = (e: any) => navbarRef.current.contains(e.target) || setActive(false);
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);
	return (
		<>
			<div className="navbar">
				<div className={"navbar__menu" + (active ? " active" : "")} ref={navbarRef}>
					<button className="navbar__menu_button" type="button" onClick={() => setActive(true)}>
						Menu
					</button>
					<div className="navbar__menu_buttons">
						<button type="button" onClick={profile}>
							Profile
						</button>
						<button type="button" onClick={logout}>
							Logout
						</button>
					</div>
				</div>
			</div>
			<Outlet />
		</>
	);
};

export default NavBar;
