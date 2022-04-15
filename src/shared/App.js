import {Grid} from "../elements"

import {ConnectedRouter}  from "connected-react-router"
import { history } from "../redux/configurestore";

import "./App.css";

function App() {
  return <div className="App">
    <Grid>
      <ConnectedRouter>
      </ConnectedRouter>
    </Grid>
  </div>;


}

export default App;
