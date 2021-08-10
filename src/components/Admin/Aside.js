import React from "react";

export default function Aside({ changeSection }) {
  return (
    <aside className="admin-aside">
      <p onClick={changeSection} id="aside-resume">
        Resumen
      </p>
      <p onClick={changeSection} id="aside-messages">
        Mensajes
      </p>
      <p onClick={changeSection} id="aside-guests">
        Invitados
      </p>
    </aside>
  );
}
