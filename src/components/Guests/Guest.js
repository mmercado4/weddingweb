import React, { useState } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { sanitizeString } from "../../tools/sanitize";

function Guest(props) {
  const [guestName, setGuestName] = useState("");
  const [guestSurname, setGuestSurname] = useState("");
  const [guestBus, setGuestBus] = useState(false);
  const [guestAllergies, setGuestAllergies] = useState("");
  const [warnings, setWarnings] = useState([]);
  const [animation, setAnimation] = useState("popup");

  const GUEST_WARNINGS = {
    NAME: "Pendiente indicar el nombre",
    SURNAME: "Pendiente indicar el apellido",
    ALREADY_REGISTER: "Ya has confirmado asistencia",
    REGISTER_SUCCESS: "¡Gracias! Nos vemos pronto.",
  };

  //Validate guest and add to DB.
  const confirmGuest = () => {
    if (validateGuest()) {
      setWarnings([]);
      let newGuest = {
        name: sanitizeString(guestName).trim().toLowerCase(),
        surname: sanitizeString(guestSurname).trim().toLowerCase(),
        bus: guestBus,
        allergies: sanitizeString(guestAllergies).trim(),
      };

      console.log(newGuest);

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
                // setGuestSurname("");
                // setGuestName("");
                // setGuestBus(false);
                // setGuestAllergies("");
                // In this state, this set group only modify the React State, not the form.
                setWarnings(GUEST_WARNINGS.REGISTER_SUCCESS);
                setTimeout(() => {
                  exitForm();
                }, 500);
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

  const exitForm = () => {
    setAnimation("popdown");
    setTimeout(() => {
      props.showForm();
    }, 1000);
  };

  const handleChange = (e) => {
    if (e.target.id === "guest-name") {
      setGuestName(e.target.value);
    } else if (e.target.id === "guest-surname") {
      setGuestSurname(e.target.value);
    } else if (e.target.id === "guest-bus") {
      setGuestBus(e.target.checked);
    } else if (e.target.id === "guest-allergies") {
      setGuestAllergies(e.target.value);
    }
  };

  return (
    <div className={`popup-form ${animation}`}>
      <div className="form-fields">
        <h3>Confirma tu asistencia</h3>
        <div className="fullname-field">
          <input
            onChange={handleChange}
            type="text"
            placeholder="Nombre"
            name="guest-name"
            id="guest-name"
          ></input>
          <input
            onChange={handleChange}
            type="text"
            placeholder="Apellido"
            name="guest-surname"
            id="guest-surname"
          ></input>
        </div>
        <input
          onChange={handleChange}
          type="text"
          placeholder="Alergias o intolerancias"
          name="guest-allergies"
          id="guest-allergies"
        ></input>
        <div className="bus-input">
          <label htmlFor="guest-bus">¿Te llevamos en autobús?</label>
          <input
            type="checkbox"
            onChange={handleChange}
            name="guest-bus"
            id="guest-bus"
          ></input>
        </div>
      </div>
      <p className="form-warnings">{warnings}</p>
      <button className="guests-confirm-btn btn" onClick={confirmGuest}>
        Confirmar
      </button>
      <button className="form-exit-btn btn" onClick={exitForm}>
        <i className="fas fa-times"></i>
      </button>
    </div>
  );
}

export default Guest;
