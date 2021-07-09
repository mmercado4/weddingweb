import React, { Fragment } from "react";
import Logout from "./Logout";

export default function Admin() {
  //Hay que redireccionar con router a Login si no se está logueado
  return (
    <Fragment>
      <h1>Admin</h1>
      <Logout />
    </Fragment>
  );
}
