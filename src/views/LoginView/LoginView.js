import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { authOperations, authSelectors } from "../../redux/auth";
import { toast } from "react-toastify";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Loader from "../../components/Loader";

const useStyles = makeStyles(() => ({
  textField: {
    marginBottom: "20px",
    width: "100%",
    backgroundColor: "#ffffff",
  },

  button: {
    color: "#000000",
    backgroundColor: "#ABEBC6",

    "&:hover": {
      backgroundColor: "#145A32",
    },
  },

  form: {
    maxWidth: "400px",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "10px",
    marginBottom: "30px",
    padding: "40px 0",
    textAlign: "center",
  },
}));

export default function LoginView() {
  const classes = useStyles();
  const dispatch = useDispatch();
  const isLoading = useSelector(authSelectors.getLoading);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "email":
        setEmail(value);
        break;

      case "password":
        setPassword(value);
        break;

      default:
        return;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (email.trim() === "" || password.trim() === "") {
      return toast.error("Please fill in all fields!");
    }
    dispatch(authOperations.logIn({ email, password }));
    setEmail("");
    setPassword("");
  };

  return (
    <form onSubmit={handleSubmit} autoComplete="off" className={classes.form}>
      <TextField
        className={classes.textField}
        label="Email"
        variant="outlined"
        type="email"
        name="email"
        value={email}
        onChange={handleChange}
      />

      <TextField
        label="Password"
        variant="outlined"
        type="password"
        name="password"
        value={password}
        onChange={handleChange}
        className={classes.textField}
      />

      {!isLoading && (
        <Button
          className={classes.button}
          variant="contained"
          size="large"
          type="submit"
        >
          Log in
        </Button>
      )}

      {isLoading && <Loader />}
    </form>
  );
}
