import React from "react";
import { Grid } from "../elements";

import { ConnectedRouter } from "connected-react-router";
import { history } from "../redux/configureStore";

import "./App.css";
import { Switch } from "react-router-dom";
import { Route } from "react-router-dom";

// pages
import Login from "../pages/Login";
import Signup from "../pages/Signup";
import Main from "../pages/Main";
import PostDetail from "../pages/PostDetail";
import Profile from "../pages/Profile";
import ProfileEdit from "../pages/ProfileEdit";
import PostUpdate from "../components/PostUpdate";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/main" exact component={Main}></Route>
          <Route
            path="/postDetail/:feedId"
            exact
            component={PostDetail}
          ></Route>
          <Route path="/feed/:feedId" exact component={PostUpdate}></Route>
          <Route path="/profile/:userId" exact component={Profile}></Route>
          <Route path="/profileEdit" exact component={ProfileEdit}></Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
