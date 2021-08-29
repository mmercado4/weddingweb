import React, { useState } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { sanitizeString } from "../../tools/sanitize";

function MessageForm({ handleShowForm }) {
  const [newMessage, setNewMessage] = useState("");
  const [newAuthor, setNewAuthor] = useState("");
  const [warning, setWarnings] = useState("");
  const [animation, setAnimation] = useState("popup");

  const WARNING_LIST = {
    API_ERROR: "El mensaje no se ha podido enviar.",
    EMPTY_ERROR: "El mensaje/autor está vacío",
    REGISTER_SUCCESS: "Gracias por tu mensaje",
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
      setWarnings("");
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
            //refreshMessages(); I don´t refresh messages because it duplicates the interval. Don´t know to solve this.
            setNewAuthor("");
            setNewMessage("");
            setWarnings(WARNING_LIST.REGISTER_SUCCESS);
            setTimeout(() => {
              exitForm();
            }, 500);
          } else {
            setWarnings(WARNING_LIST.API_ERROR);
          }
          //TODO: send email to the couple https://www.npmjs.com/package/email-templates#install
        })
        .catch((err) => console.error(err));
    }
  };

  const validateMessage = () => {
    if (newMessage.length === 0 || newAuthor.length === 0) {
      setWarnings(WARNING_LIST.EMPTY_ERROR);
      return false;
    }
    return true;
  };

  const exitForm = () => {
    setAnimation("popdown");
    setTimeout(() => {
      handleShowForm();
    }, 1000);
  };

  return (
    <div className={`popup-form ${animation}`}>
      <div className="form-fields">
        <h3>Déjanos tu mensaje</h3>
        <input
          onChange={handleChanges}
          type="text"
          name="author"
          id="author"
          value={newAuthor}
          placeholder="Autor"
          maxLength="30"
        ></input>
        <textarea
          onChange={handleChanges}
          name="message"
          id="message"
          value={newMessage}
          placeholder="Tú mensaje (máximo 120 caracteres)"
          maxLength="120"
        ></textarea>
        <p className="form-warnings">{warning}</p>
        <button onClick={sendMessage} className="btn" id="msg-button">
          Enviar
        </button>
        <button className="form-exit-btn btn" onClick={exitForm}>
          <i className="fas fa-times"></i>
        </button>
      </div>
    </div>
  );
}

export default MessageForm;
