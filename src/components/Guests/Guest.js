import React, { Fragment, useState } from "react";
import Companions from "./Companions";
import { HOST, APIPORT } from "../../tools/consts";
import { sanitizeString } from "../../tools/sanitize";

function Guest(props) {
  const [companions, setCompanions] = useState([]);
  const [companionQty, setCompanionQty] = useState(0);
  const [guestName, setGuestName] = useState("");
  const [guestEmail, setGuestEmail] = useState("");
  const [warnings, setWarnings] = useState([]);

  const GUEST_WARNINGS = {
    NAME: "Pendiente indicar el nombre",
    EMAIL: ["Pendiente indicar el email", "No se ha indicado un email"],
    COMPANIONS: "Hay acompañantes pendientes de completar",
  };

  const addField = () => {
    //Limit to 4 companions
    if (companionQty < 4) {
      let newArr = companions;
      newArr.push({
        n: companions.length + 1,
        companionName: "",
      });
      setCompanions(newArr);
      setCompanionQty(companionQty + 1);
    }
  };

  const deleteField = () => {
    if (companionQty > 0) {
      let arr = companions;
      arr.pop();
      setCompanions(arr);
      setCompanionQty(companionQty - 1);
    }
  };

  const addCompanion = (e) => {
    let compId = e.target.id.split("-")[1];
    let newCompanionList = companions;
    newCompanionList[compId].companionName = e.target.value;
    setCompanions(newCompanionList);
  };

  const confirmGuest = () => {
    if (validateGuest()) {
      setWarnings([]);
      let newGuest = {
        name: sanitizeString(guestName),
        email: sanitizeString(guestEmail),
        companions: companions,
      };
      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newGuest),
      };
      let apiUrl = "/api/guests";
      fetch(`${HOST}${APIPORT}${apiUrl}`, opts)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          setGuestEmail("");
          setGuestName("");
          setCompanions([]);
          setCompanionQty(0);
          props.showForm();
        })
        .catch((error) => console.error(error));
    }
  };

  const validateGuest = () => {
    let warningObj = [];

    let emailRegex =
      /^[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?$/;
    if (guestName.length === 0) {
      warningObj.push(GUEST_WARNINGS.NAME);
    }
    if (guestEmail.length === 0) {
      warningObj.push(GUEST_WARNINGS.EMAIL[0]);
    } else if (!emailRegex.test(guestEmail)) {
      warningObj.push(GUEST_WARNINGS.EMAIL[1]);
    }
    if (
      companions.length > 0 &&
      companions.map((comp) => comp.companionName).includes("")
    ) {
      warningObj.push(GUEST_WARNINGS.COMPANIONS);
    }

    setWarnings(warningObj);

    if (warningObj.length === 0) {
      return true;
    } else {
      return false;
    }
  };

  const handleChange = (e) => {
    if (e.target.id === "guest-name") {
      setGuestName(e.target.value);
    } else if (e.target.id === "guest-email") {
      setGuestEmail(e.target.value);
    }
  };

  return (
    <Fragment>
      <input
        onChange={handleChange}
        type="text"
        placeholder="invitado"
        name="guest-name"
        id="guest-name"
      ></input>
      <input
        onChange={handleChange}
        type="email"
        placeholder="tu email"
        name="guest-email"
        id="guest-email"
      ></input>
      <button onClick={addField}>Añadir acompañante</button>
      <button onClick={deleteField}>Quitar acompañante</button>
      <br />
      <Companions companions={companions} addCompanion={addCompanion} />
      <br />
      <p>{warnings}</p>
      <button onClick={confirmGuest}>Confirmar</button>
    </Fragment>
  );
}

export default Guest;
