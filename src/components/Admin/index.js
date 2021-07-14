import React, { Fragment } from "react";
import Logout from "./Logout";
import List from "./List";

export default function Admin() {
  return (
    <Fragment>
      <h1>Admin</h1>
      <Logout />
      <List />
    </Fragment>
  );
}
