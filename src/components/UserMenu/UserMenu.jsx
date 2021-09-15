import { useSelector, useDispatch } from "react-redux";
import { authSelectors, authOperations } from "../../redux/auth";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import defaultAvatar from "../../img/avatar.png";
import style from "./UserMenu.module.css";

const useStyles = makeStyles((theme) => ({
  button: {
    backgroundColor: "#52BE80",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function UserMenu() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const name = useSelector(authSelectors.getUserName);

  return (
    <div className={style.container}>
      <img
        src={defaultAvatar}
        alt="Default Avatar"
        width="32"
        className={style.avatar}
      />
      <span className={style.name}>Welcome, {name}</span>
      <Button
        className={classes.button}
        variant="outlined"
        type="button"
        onClick={() => dispatch(authOperations.logOut())}
      >
        Log out
      </Button>
    </div>
  );
}
