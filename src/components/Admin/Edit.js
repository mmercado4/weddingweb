import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";

export default function Edit({ id, section, closeEditItem }) {
  const [item, setItem] = useState({});
  const [warning, setWarning] = useState("");

  const EDIT_WARNINGS = {
    EMPTY_FIELDS: "Hay campos vacíos. Revisar",
    UPDATE_SUCCEED:
      section === "messages"
        ? "Mensaje actualizado correctamente"
        : "Invitado modificado correctamente",
    UPDATE_UNSUCCEED:
      "Ha ocurrido algún problema y no se ha podido actualizar. Prueba más tarde",
  };

  useEffect(() => {
    fetchItem();
  }, []);

  const fetchItem = () => {
    let itemUrl = `${HOST}${APIPORT}/api/${section}/${id}`;

    fetch(itemUrl)
      .then((response) => response.json())
      .then((data) => {
        setItem(data);
      })
      .catch((error) => console.error(error));
  };

  const handleChange = (e) => {
    let newItem = item;
    let key = e.target.id.split("-")[1];
    if (key === "bus") {
      newItem[key] = e.target.checked;
    } else {
      newItem[key] = e.target.value;
    }
    setItem(newItem);
  };

  const saveChanges = () => {
    if (validateForm()) {
      console.log(item);
      ///********************MENSAJE DE CONFIRMACIÓN************* */

      let opts = {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(item),
      };
      let itemUrl = `${HOST}${APIPORT}/api/${section}/${id}`;
      fetch(itemUrl, opts)
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            setWarning(EDIT_WARNINGS.UPDATE_SUCCEED);
            setTimeout(() => closeEditItem(), 1500);
          }
        })
        .catch((error) => {
          setWarning(EDIT_WARNINGS.UPDATE_UNSUCCEED);
          console.error(error);
        });
    }
  };

  const validateForm = () => {
    if (section === "messages") {
      if (item.author.length === 0 || item.message.length === 0) {
        setWarning(EDIT_WARNINGS.EMPTY_FIELDS);
        return false;
      }
    } else {
      if (item.name.length === 0 || item.surname.length === 0) {
        setWarning(EDIT_WARNINGS.EMPTY_FIELDS);
        return false;
      }
    }
    setWarning("");
    return true;
  };

  const createForm = () => {
    if ("name" in item || "author" in item) {
      if (section === "messages") {
        let { author, message } = item;
        return (
          <Fragment>
            <div className="edit-form-field">
              <label htmlFor="edit-author">Autor</label>
              <input
                type="text"
                id="edit-author"
                name="edit-author"
                onChange={handleChange}
                defaultValue={author}
              ></input>
            </div>
            <div className="edit-form-field text-message">
              <label htmlFor="edit-message">Mensaje</label>
              <textarea
                rows="4"
                cols="50"
                id="edit-message"
                name="edit-message"
                onChange={handleChange}
                defaultValue={message}
                maxLength="120"
              ></textarea>
            </div>
          </Fragment>
        );
      } else {
        let { name, surname, bus } = item;
        return (
          <Fragment>
            <div className="edit-form-field">
              <label htmlFor="edit-name">Nombre</label>
              <input
                type="text"
                id="edit-name"
                name="edit-name"
                onChange={handleChange}
                defaultValue={name}
              ></input>
            </div>
            <div className="edit-form-field">
              <label htmlFor="edit-surname">Apellido</label>
              <input
                type="text"
                id="edit-surname"
                name="edit-surname"
                onChange={handleChange}
                defaultValue={surname}
              ></input>
            </div>
            <div className="edit-form-field">
              <label htmlFor="edit-bus">Bus</label>
              <input
                type="checkbox"
                id="edit-bus"
                name="edit-bus"
                defaultChecked={bus}
                onChange={handleChange}
              ></input>
            </div>
          </Fragment>
        );
      }
    }
  };

  let editForm = createForm();

  return (
    <section className="edit-data-section">
      <h3>Editar</h3>
      <div className="edit-form">{editForm}</div>
      <br />
      <button className="btn" onClick={saveChanges}>
        Guardar
      </button>
      <p>{warning}</p>
    </section>
  );
}
