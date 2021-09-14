import React from "react";
import { useEffect, lazy, Suspense } from "react";
import { useDispatch } from "react-redux";
import { Switch, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import "./App.css";

import AppBar from "./components/AppBar";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";

import Container from "./components/Container";
import Loader from "./components/Loader";

import { authOperations } from "./redux/auth";

const HomeView = lazy(() =>
  import("./views/HomeView" /* webpackChunkName: "home-view" */)
);
const RegisterView = lazy(() =>
  import("./views/RegisterView" /* webpackChunkName: "register-view" */)
);
const LoginView = lazy(() =>
  import("./views/LoginView" /* webpackChunkName: "login-view" */)
);
const ContactView = lazy(() =>
  import("./views/ContactView" /* webpackChunkName: "contacts-view" */)
);
const NotFoundView = lazy(() =>
  import(
    "./views/NotFoundView/NotFoundView" /* webpackChunkName: "not-found-view" */
  )
);

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(authOperations.getCurrentUser());
  }, [dispatch]);

  return (
    <Container>
      <AppBar />

      <Suspense fallback={<Loader />}>
        <Switch>
          <PublicRoute path="/" exact>
            <HomeView />
          </PublicRoute>

          <PublicRoute path="/register" restricted redirectTo="/contacts">
            <RegisterView />
          </PublicRoute>

          <PublicRoute path="/login" restricted redirectTo="/contacts">
            <LoginView />
          </PublicRoute>

          <PrivateRoute path="/contacts" redirectTo="/login">
            <ContactView />
          </PrivateRoute>

          <Route>
            <NotFoundView />
          </Route>
        </Switch>
      </Suspense>

      <ToastContainer autoClose={3700} position="top-center" />
    </Container>
  );
}

export default App;
