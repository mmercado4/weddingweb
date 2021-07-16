import React, { Fragment } from "react";

export default function Aside({ changeSection }) {
  return (
    <Fragment>
      <p onClick={changeSection} id="aside-resume">
        Resumen
      </p>
      <p onClick={changeSection} id="aside-messages">
        Mensajes
      </p>
      <p onClick={changeSection} id="aside-guests">
        Invitados
      </p>
    </Fragment>
  );
}
