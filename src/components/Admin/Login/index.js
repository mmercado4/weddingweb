import React, { Fragment } from "react";

export default function Login() {
  return (
    <Fragment>
      <input
        aria-label="login-user"
        type="text"
        name="login-user"
        id="login-user"
        placeholder="Usuario"
      ></input>
      <input
        type="text"
        name="login-password"
        id="login-password"
        placeholder="Contraseña"
      ></input>
      <button>Acceder</button>
    </Fragment>
  );
}
