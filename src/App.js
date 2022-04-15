import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { ConnectedRouter } from "connected-react-router";
import { history } from "./redux/configureStore";

// pages
import Main from "./pages/Main";

import "./App.css";

function App() {
  return (
    <div className="App">
      <ConnectedRouter history={history}>
        <Switch>
          <Route path={"/"} exact component={Main}></Route>
        </Switch>
      </ConnectedRouter>
    </div>
  );
}

export default App;
