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

function App() {
  return (
    <div className="App">
      <Grid>
        <ConnectedRouter history={history}>
          <Switch>
            <Route path="/" exact component={Login}></Route>
            <Route path="/signup" exact component={Signup}></Route>
            <Route path="/main" exact component={Main}></Route>
            <Route path="/postdetail" exact component={PostDetail}></Route>
            <Route path="/profile" exact component={Profile}></Route>
            <Route path="/profileedit" exact component={ProfileEdit}></Route>
          </Switch>
        </ConnectedRouter>
      </Grid>
    </div>
  );
}

export default App;
