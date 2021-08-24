import React from "react";

function Header() {
  const weddingDate = new Date(2022, 1, 26, 12);
  //const weddingDate = new Date(2021, 6, 18, 18); //TEST
  let head;

  const checkTime = () => {
    let now = new Date();
    if (weddingDate < now) {
      head = <h1 className="neon">Just Married</h1>;
    } else {
      head = <h1>Bienvenidos a nuestra web</h1>;
    }
  };

  checkTime();

  return (
    <header className="web-header">
      <h3>26.02.22</h3>
      {head}
    </header>
  );
}

export default Header;
