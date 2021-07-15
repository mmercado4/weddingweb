import React, { Fragment, useState } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { sanitizeString } from "../../tools/sanitize";

function Guest(props) {
  const [guestName, setGuestName] = useState("");
  const [guestSurname, setGuestSurname] = useState("");
  const [guestBus, setGuestBus] = useState(false);
  const [warnings, setWarnings] = useState([]);

  const GUEST_WARNINGS = {
    NAME: "Pendiente indicar el nombre",
    SURNAME: ["Pendiente indicar el apellido"],
    ALREADY_REGISTER: "Ya has confirmado asistencia",
  };

  //Validate guest and add to DB.
  const confirmGuest = () => {
    if (validateGuest()) {
      setWarnings([]);
      let newGuest = {
        name: sanitizeString(guestName).trim().toLowerCase(),
        surname: sanitizeString(guestSurname).trim().toLowerCase(),
        bus: guestBus,
      };

      let apiUrl = "/api/guests";

      //Check if the guest exist.
      fetch(
        `${HOST}${APIPORT}${apiUrl}/name/${newGuest.name}/surname/${newGuest.surname}`
      )
        .then((response) => response.json())
        .then((data) => {
          if (data.length > 0) {
            setWarnings(GUEST_WARNINGS.ALREADY_REGISTER);
          } else {
            let opts = {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(newGuest),
            };

            fetch(`${HOST}${APIPORT}${apiUrl}`, opts)
              .then((response) => response.json())
              .then((data) => {
                console.log(data);
                setGuestSurname("");
                setGuestName("");
                setGuestBus(false);
                props.showForm();
              })
              .catch((error) => console.error(error));
          }
        })
        .catch((error) => console.error(error));
    }
  };

  const validateGuest = () => {
    let warningObj = [];

    if (guestName.length === 0) {
      warningObj.push(GUEST_WARNINGS.NAME);
    } else if (guestSurname.length === 0) {
      warningObj.push(GUEST_WARNINGS.SURNAME);
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
    } else if (e.target.id === "guest-surname") {
      setGuestSurname(e.target.value);
    } else if (e.target.id === "guest-bus") {
      setGuestBus(e.target.checked);
    }
  };

  return (
    <Fragment>
      <input
        onChange={handleChange}
        type="text"
        placeholder="nombre"
        name="guest-name"
        id="guest-name"
      ></input>
      <input
        onChange={handleChange}
        type="text"
        placeholder="apellido"
        name="guest-surname"
        id="guest-surname"
      ></input>
      <input
        type="checkbox"
        onChange={handleChange}
        name="guest-bus"
        id="guest-bus"
      ></input>
      <label htmlFor="guest-bus">Bus?</label>
      <br />
      <p>{warnings}</p>
      <button onClick={confirmGuest}>Confirmar</button>
    </Fragment>
  );
}

export default Guest;
