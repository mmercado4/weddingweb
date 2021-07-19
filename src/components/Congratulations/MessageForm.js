import React, { Fragment, useState } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { sanitizeString } from "../../tools/sanitize";

function MessageForm(props) {
  const [newMessage, setNewMessage] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [validationErrors, setValidationErrors] = useState("");

  const ERROR_LIST = {
    API_ERROR: "El mensaje no se ha podido enviar.",
    EMPTY_ERROR: "El mensaje/autor está vacío",
  };

  const handleChanges = (e) => {
    if (e.target.id === "message") {
      setNewMessage(e.target.value);
    } else if (e.target.id === "author") {
      setNewAuthor(e.target.value);
    }
  };

  const sendMessage = () => {
    if (validateMessage()) {
      setValidationErrors("");
      let msg = {
        author: sanitizeString(newAuthor),
        message: sanitizeString(newMessage),
      };

      let opts = {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(msg),
      };

      const apiUrl = "/api/messages";
      fetch(`${HOST}${APIPORT}${apiUrl}`, opts)
        .then((response) => response.json())
        .then((data) => {
          console.log(data);
          if (data.success) {
            props.fetchMessages();
            setNewAuthor("");
            setNewMessage("");
          } else {
            setValidationErrors(ERROR_LIST.API_ERROR);
          }

          //ENVIO DE CORREO A LOS NOVIOS!! https://www.npmjs.com/package/email-templates#install
        })
        .catch((err) => console.error(err));
    }
  };

  const validateMessage = () => {
    if (newMessage.length === 0 || newAuthor.length === 0) {
      setValidationErrors(ERROR_LIST.EMPTY_ERROR);
      return false;
    }

    return true;
  };

  return (
    <Fragment>
      <div>
        <input
          onChange={handleChanges}
          type="text"
          name="author"
          id="author"
          value={newAuthor}
          placeholder="Autor"
          maxLength="30"
        ></input>
        <input
          onChange={handleChanges}
          type="text"
          name="message"
          id="message"
          value={newMessage}
          placeholder="Tú mensaje"
          maxLength="150"
        ></input>
        <button onClick={sendMessage} id="msg-button">
          Enviar
        </button>
        <p>{validationErrors}</p>
      </div>
    </Fragment>
  );
}

export default MessageForm;
