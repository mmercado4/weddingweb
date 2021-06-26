import React, { Fragment, useState } from "react";
import PropTypes from "prop-types";

function Companions(props) {
  let { companions, addCompanion } = props;

  return companions.map((comp, index) => (
    <div key={`comp${index}`}>
      <input
        onChange={addCompanion}
        type="text"
        id={`comp-${index}`}
        placeholder={`Acompañante ${comp.n}`}
      ></input>
    </div>
  ));
}

Companions.propTypes = {
  companions: PropTypes.array,
};

export default Companions;
