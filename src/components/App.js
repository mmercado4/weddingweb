import React, { Fragment } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import Home from "./Home";
import Admin from "./Admin";
import Login from "./Admin/Login";

function App() {
  return (
    <Fragment>
      <BrowserRouter>
        <Switch>
          <Route path="/login" component={Login} />
          <Route path="/admin" component={Admin} />
          <Route path="/" component={Home} />
        </Switch>
      </BrowserRouter>
    </Fragment>
  );
}

export default App;
