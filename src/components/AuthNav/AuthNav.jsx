import { NavLink } from "react-router-dom";
import style from "./AuthNav.module.css";

const AuthNav = () => (
  <div>
    <NavLink
      to="/register"
      exact
      className={style.link}
      activeClassName={style.activeLink}
    >
      Sign up
    </NavLink>
    <NavLink
      to="/login"
      exact
      className={style.link}
      activeClassName={style.activeLink}
    >
      Log in
    </NavLink>
  </div>
);

export default AuthNav;
