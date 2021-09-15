import React from "react";
import { useSelector } from "react-redux";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Navigation from "../Navigation";
import UserMenu from "../UserMenu";
import AuthNav from "../AuthNav";
import { authSelectors } from "../../redux/auth";

const useStyles = makeStyles(() => ({
  root: {
    flexGrow: 1,
  },
  header: { backgroundColor: "#669966" },
  toolbar: {
    flexGrow: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
  },
}));

export default function ButtonAppBar() {
  const classes = useStyles();
  const isLoggedIn = useSelector(authSelectors.getIsLoggedIn);

  return (
    <div className={classes.root}>
      <AppBar position="static" className={classes.header}>
        <Toolbar className={classes.toolbar}>
          <Navigation />
          {isLoggedIn ? <UserMenu /> : <AuthNav />}
        </Toolbar>
      </AppBar>
    </div>
  );
}
