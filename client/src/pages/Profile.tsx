import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { authHost } from "../actions/fetch";
import { useActions, useAppSelector } from "../actions/redux";
import ProfileForm from "../components/ProfileForm";
import "../styles/profile.scss";
import { User } from "../types/users";

const Profile = () => {
	const { id } = useParams();
	const [profile, setProfile] = useState<User>();
	const { addNotification } = useActions();
	const { isLoading, user } = useAppSelector((state) => state.user);
	const navigate = useNavigate();
	useEffect(() => {
		if (!isLoading && !user) {
			document.querySelector(".users")?.classList.add("disappearance");
			setTimeout(() => {
				navigate("/auth");
			}, 800);
		}
	}, [isLoading, user]);
	useEffect(() => {
		authHost.get("/users/" + id).then(({ data }) => {
			if (data.error) {
				addNotification({ text: data.error });
				navigate("/");
			} else setProfile(data.user);
		});
	}, []);
	return <div className="profile">{profile && <ProfileForm {...profile} />}</div>;
};

export default Profile;
