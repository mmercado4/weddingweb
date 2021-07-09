import React, { Fragment, useState } from "react";

function Logout() {
  const handleClick = () => {
    clearCookie();
  };

  const clearCookie = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <Fragment>
      <button onClick={handleClick}>Cerrar sesión</button>
    </Fragment>
  );
}

export default Logout;
