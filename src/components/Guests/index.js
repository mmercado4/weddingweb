import React, { Fragment, useState } from "react";
import Guest from "./Guest";

function Guests() {
  const [assistanceForm, setAssistanceForm] = useState(false);

  const showForm = () => {
    setAssistanceForm(!assistanceForm);
  };

  return (
    <Fragment>
      <h2>Invitados</h2>
      <button onClick={showForm}>Confirma tu asistencia</button> <br />
      {assistanceForm ? <Guest showForm={showForm} /> : true}
    </Fragment>
  );
}

export default Guests;
