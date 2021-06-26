import React, { Fragment, useState } from "react";
import Companion from "./Companion";

function Guest() {
  const [companions, setCompanions] = useState(0);

  const addCompanion = () => {
    //Limitarlo a 4 acompañantes
    let newCompanions = companions + 1;
    setCompanions(newCompanions);
  };

  const confirmGuest = () => {
    console.log("añadimos al nuevo");
  };

  return (
    <Fragment>
      <input type="text" placeholder="invitado"></input>
      <button onClick={addCompanion}>Añadir acompañante</button>
      {companions > 0 ? <Companion numberCompanions={companions} /> : true}
      <br />
      <button onClick={confirmGuest}>Confirmar</button>
    </Fragment>
  );
}

export default Guest;
