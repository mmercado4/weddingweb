import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { capitalize } from "../../tools/capitalize";
import Pages from "./Pages";
import Edit from "./Edit";
import ReactHTMLTableToExcel from "react-html-table-to-excel";

export default function List({
  section,
  edit,
  editItem,
  closeEditItem,
  currentPage,
  changePage,
  resetPage,
}) {
  const [pages, setPages] = useState(0);
  const [amount, setAmount] = useState(15);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchPages();
    fetchList();
  }, [section, currentPage, amount, edit]);

  const fetchList = () => {
    let listUrl;
    if (amount === "Todos") {
      listUrl = `/api/${section}`;
    } else {
      listUrl = `/api/${section}/page/${currentPage}/amount/${amount}`;
    }

    fetch(`${HOST}${APIPORT}${listUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchPages = () => {
    if (amount === "Todos") {
      setPages(1);
    } else {
      const pagesUrl = `/api/${section}`;
      fetch(`${HOST}${APIPORT}${pagesUrl}`)
        .then((response) => response.json())
        .then((data) => {
          let numberOfPages = Math.ceil(data.length / amount);
          setPages(numberOfPages);
        })
        .catch((err) => console.error(err));
    }
  };

  const handleSelectChange = (e) => {
    let newAmount;
    if (e.target.value === "Todos") {
      newAmount = e.target.value;
    } else {
      newAmount = parseInt(e.target.value);
    }
    setAmount(newAmount);
    resetPage();
  };

  const deleteItem = (e) => {
    const id = e.target.parentNode.name;
    //TODO: Show confirm message.
    let deleteUrl = `/api/${section}/${id}`;
    let opts = {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
    };
    fetch(`${HOST}${APIPORT}${deleteUrl}`, opts)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        fetchList();
      })
      .catch((error) => console.error(error));
  };

  const createListItem = () => {
    let fullList;
    if (list.length > 0) {
      //Check section.
      if (section === "guests") {
        fullList = list.map((item, i) => {
          let { _id, name, surname, bus } = item;
          if (name) {
            //Check if name exists. Section change before list, so message list enter in this if condicional.
            let capName = capitalize(name);
            let capSurname = capitalize(surname);
            return (
              <tr key={`guest-${i}`}>
                <td>{i + 1}</td>
                <td>
                  {capName} {capSurname}
                </td>
                <td>{bus ? "SI" : "NO"}</td>
                <td>
                  <button name={_id} onClick={editItem}>
                    <i className="fas fa-marker"></i>
                  </button>
                  <button name={_id} onClick={deleteItem}>
                    <i className="fas fa-trash"></i>
                  </button>
                </td>
              </tr>
            );
          }
        });
      } else if (section === "messages") {
        fullList = list.map((item, i) => {
          let { _id, author, message } = item;
          return (
            <tr key={`message-${i}`}>
              <td>{i + 1}</td>
              <td>{author}</td>
              <td>{message}</td>
              <td>
                <button name={_id} onClick={editItem}>
                  <i className="fas fa-marker"></i>
                </button>
                <button name={_id} onClick={deleteItem}>
                  <i className="fas fa-trash"></i>
                </button>
              </td>
            </tr>
          );
        });
      }
    } else {
      //Errors or no items.
      fullList = (
        <tr>
          <td colSpan="4">Ha ocurrido un problema. Prueba más tarde</td>
        </tr>
      );
    }
    return fullList;
  };

  const listItem = createListItem();

  if (edit.length > 0) {
    return <Edit id={edit} section={section} closeEditItem={closeEditItem} />;
  } else {
    return (
      <Fragment>
        <h3>{section === "messages" ? "Mensajes" : "Invitados"}</h3>
        <ReactHTMLTableToExcel
          id="table-xls-button"
          className="download-table-xls-button"
          table="list-table"
          filename={section}
          sheet="tablexls"
          buttonText="Descargar como XLS"
        />
        <table id="list-table">
          <thead>
            <tr>
              <th>#</th>
              <th>{section === "messages" ? "Autor" : "Nombre y Apellido"}</th>
              <th>{section === "messages" ? "Mensaje" : "Bus"}</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>{listItem}</tbody>
        </table>
        <Pages pages={pages} changePage={changePage} />
        <select className="select-amount" onChange={handleSelectChange}>
          <option>15</option>
          <option>30</option>
          <option>50</option>
          <option>Todos</option>
        </select>
      </Fragment>
    );
  }
}
