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
import Header from "../components/Header";

import { Image } from "../elements";
import Follower from "../components/Follower";

function App() {
  return (
    <div className="App">
      <Header />
      {/* <hr
        style={{
          border: "0",
          backgroundColor: "#e1e1e1",
          height: "1px",
          margin: "0",
        }}
      /> */}

      <ConnectedRouter history={history}>
        <Switch>
          <Route path="/" exact component={Login}></Route>
          <Route path="/signup" exact component={Signup}></Route>
          <Route path="/" exact component={Main}></Route>
          <Route path="/postDetail" exact component={PostDetail}></Route>
          <Route path="/profile" exact component={Profile}></Route>
          <Route path="/profileEdit" exact component={ProfileEdit}></Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
