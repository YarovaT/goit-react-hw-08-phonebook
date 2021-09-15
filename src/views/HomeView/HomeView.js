import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { authSelectors } from "../../redux/auth";
import style from "./HomeView.module.css";
import EmojiPeopleIcon from "@material-ui/icons/EmojiPeople";

const HomeView = () => {
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <div className={style.wrapper}>
      <h1 className={style.title}>
        Welcome to your Phonebook
        <EmojiPeopleIcon
          style={{ color: "black" }}
          fontSize="large"
        ></EmojiPeopleIcon>
      </h1>

      {!isLoggedIn && (
        <p className={style.info}>
          Please,{" "}
          <Link className={style.link} to="/register">
            Sign up
          </Link>{" "}
          or{" "}
          <Link className={style.link} to="/login">
            Log in
          </Link>{" "}
          to have access to the Phonebook!
        </p>
      )}
    </div>
  );
};

export default HomeView;
