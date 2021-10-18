import React from "react";
import "./styles/App.scss";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import UserTable from "./components/UserTable";
import EditUser from "./components/EditUser";
import NewUser from "./components/NewUser";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route path="/" exact={true} component={UserTable} />
          <Route path="/new" exact={true} component={NewUser} />
          <Route path="/edit/:id" component={EditUser} />
        </Switch>
      </Router>
    </>
  );
}

export default App;
