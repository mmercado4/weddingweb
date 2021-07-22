import React, { Fragment, useState } from "react";
import Guest from "./Guest";

function Guests() {
  const [assistanceForm, setAssistanceForm] = useState(false);

  const showForm = () => {
    setAssistanceForm(!assistanceForm);
  };

  return (
    <section className="guests-section">
      <h2>Confirmanos tu asistencia</h2>
      <button className="guests-form-btn" onClick={showForm}>
        Confirma
      </button>{" "}
      <br />
      {assistanceForm ? <Guest showForm={showForm} /> : true}
    </section>
  );
}

export default Guests;
