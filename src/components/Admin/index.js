import React, { Fragment } from "react";
import Logout from "./Logout";
import GuestList from "./GuestList";

export default function Admin() {
  return (
    <Fragment>
      <h1>Admin</h1>
      <Logout />
      <GuestList />
    </Fragment>
  );
}
