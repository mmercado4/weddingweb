import React, { useState } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { sanitizeString } from "../../tools/sanitize";
import { Link, Redirect, BrowserRouter } from "react-router-dom";
// import axios from "axios";

export default function Login() {
  const [user, setUser] = useState("");
  const [password, setPassword] = useState("");
  const [warning, setWarning] = useState("");
  const [login, setLogin] = useState(false);

  const LOGIN_WARNINGS = {
    EMPTY_FIELDS: "Usuario/contraseña pendiente",
    LOGIN_SUCCESS: "Usuario logueado correctamente",
    LOGIN_NOT_SUCCESS: "Usuario/contraseña incorrecta",
  };

  const handleChange = (e) => {
    if (e.target.id === "login-user") {
      setUser(e.target.value);
    } else if (e.target.id === "login-password") {
      setPassword(e.target.value);
    }
  };

  const validateForm = () => {
    if (user.length === 0 || password.length === 0) {
      setWarning(LOGIN_WARNINGS.EMPTY_FIELDS);
      return false;
    }
    return true;
  };

  const handleKeyDown = (e) => {
    if (e.code === "Enter" || e.code === "NumpadEnter") {
      checkLogin();
    }
  };

  const handleClick = () => {
    checkLogin();
  };

  const checkLogin = () => {
    if (validateForm()) {
      setWarning("");
      let urlLogin = "/api/login";
      let userLogin = {
        user: sanitizeString(user),
        password: sanitizeString(password),
      };

      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userLogin),
        credentials: "include", //Include credentials to create token cookie
      };

      //https://blog.logrocket.com/axios-or-fetch-api/
      // axios(opts)
      //   .then((response) => {
      //     console.log(response);
      //     if (response.data.success) {
      //       setWarning(LOGIN_WARNINGS.LOGIN_SUCCESS);
      //       setTimeout(() => {
      //         setLogin(true);
      //       }, 1500);
      //     }
      //   })
      //   .catch((error) => console.log(error));

      fetch(`${HOST}${APIPORT}${urlLogin}`, opts)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            setWarning(LOGIN_WARNINGS.LOGIN_SUCCESS);
            setTimeout(() => {
              setLogin(true);
            }, 1500);
          } else {
            setWarning(LOGIN_WARNINGS.LOGIN_NOT_SUCCESS);
            setPassword("");
          }
        })
        .catch((error) => console.log(error));
    }
  };

  return (
    <section className="login-section">
      <div className="login-form">
        <h2>Login</h2>
        <div className="login-fields">
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="text"
            name="login-user"
            id="login-user"
            placeholder="Usuario"
            value={user}
          ></input>
          <input
            onChange={handleChange}
            onKeyDown={handleKeyDown}
            type="password"
            name="login-password"
            id="login-password"
            placeholder="Contraseña"
            value={password}
          ></input>
          <div className="login-buttons">
            <button className="btn" onClick={handleClick}>
              Acceder
            </button>
            <a href="/" className="btn">
              Volver
            </a>
          </div>
          <p>{warning}</p>
        </div>

        {login ? <Redirect to="admin" /> : null}
      </div>
    </section>
  );
}
