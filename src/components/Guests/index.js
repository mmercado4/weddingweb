import React, { Fragment, useState } from "react";
import Guest from "./Guest";

function Guests() {
  const [assistanceForm, setAssistanceForm] = useState(false);

  const handleClick = () => {
    setAssistanceForm(!assistanceForm);
  };

  return (
    <Fragment>
      <h2>Invitados</h2>
      <button onClick={handleClick}>Confirma tu asistencia</button> <br />
      {assistanceForm ? <Guest /> : true}
    </Fragment>
  );
}

export default Guests;
