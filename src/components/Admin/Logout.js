import React from "react";

function Logout() {
  const handleClick = () => {
    clearCookie();
  };

  const clearCookie = () => {
    document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.href = "/";
  };

  return (
    <button className="logout-button" onClick={handleClick}>
      Cerrar sesión
    </button>
  );
}

export default Logout;
