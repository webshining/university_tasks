import { useEffect, useRef, useState } from "react";
import { useActions } from "../actions/redux";
import "../styles/navbar.scss";

const NavBar = () => {
	const navbarRef = useRef<any>(null);
	const [active, setActive] = useState<boolean>(false);
	const { logoutUser } = useActions();
	const logout = () => {
		document.querySelector(".navbar")?.classList.add("disappearance");
		document.querySelector(".users")?.classList.add("disappearance");
		setTimeout(async () => {
			await logoutUser();
		}, 800);
	};
	useEffect(() => {
		const onClick = (e: any) => navbarRef.current.contains(e.target) || setActive(false);
		document.addEventListener("click", onClick);
		return () => document.removeEventListener("click", onClick);
	}, []);
	return (
		<div className="navbar">
			<div className={"navbar__menu" + (active ? " active" : "")} ref={navbarRef}>
				<button className="navbar__menu_button" type="button" onClick={() => setActive(true)}>
					Menu
				</button>
				<div className="navbar__menu_buttons">
					<button type="button" onClick={logout}>
						Logout
					</button>
				</div>
			</div>
		</div>
	);
};

export default NavBar;
