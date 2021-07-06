import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import SignUp from "./pages/SignUp";
import SignIn from "./pages/SignIn";
import Activate from "./auth/Activate";
import GlobalStyle from "./globalStyles";
import Header from "./components/Header";
import Home from "./pages/Home";
import Private from "./pages/Private";
import PrivateRoute from "./components/PrivateRoute";
import Admin from "./pages/Admin";
import AdminRoute from "./components/AdminRoute";
import Forgot from "./components/Forgot";
import Reset from "./components/Reset";

function App() {
  return (
    <BrowserRouter>
      <GlobalStyle />
      <Header />
      <Switch>
        <Route path="/" exact component={Home} />
        <Route path="/signup" component={SignUp} />
        <Route path="/signin" component={SignIn} />
        <Route path="/auth/activate/:token" component={Activate} />
        <PrivateRoute path="/private" component={Private} />
        <AdminRoute path="/admin" component={Admin} />
        <Route path="/auth/password/forgot" component={Forgot} />
        <Route path="/auth/password/reset/:token" component={Reset} />
      </Switch>
    </BrowserRouter>
  );
}

export default App;
