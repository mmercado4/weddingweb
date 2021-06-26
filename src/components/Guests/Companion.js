import React, { Fragment } from "react";

function Companion(props) {
  return (
    <Fragment>
      <p>
        {props.numberCompanions ? props.numberCompanions : "SIN ACOMPAÑANTES"}
      </p>
      <input type="text" placeholder="Acompañante"></input>
    </Fragment>
  );
}

export default Companion;
