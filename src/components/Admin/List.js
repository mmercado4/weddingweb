import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { capitalize } from "../../tools/capitalize";
import Pages from "./Pages";
import Edit from "./Edit";

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

  const [warnings, setWarnings] = useState(""); //TODO: Use warinngs in case there is no items in list or errors.

  useEffect(() => {
    fetchPages();
    fetchList();
  }, [section, currentPage, amount, edit]);

  const fetchList = () => {
    const listUrl = `/api/${section}/page/${currentPage}/amount/${amount}`;
    fetch(`${HOST}${APIPORT}${listUrl}`)
      .then((response) => response.json())
      .then((data) => {
        setList(data);
      })
      .catch((err) => console.error(err));
  };

  const fetchPages = () => {
    const pagesUrl = `/api/${section}`;
    fetch(`${HOST}${APIPORT}${pagesUrl}`)
      .then((response) => response.json())
      .then((data) => {
        let numberOfPages = Math.ceil(data.length / amount);
        setPages(numberOfPages);
      })
      .catch((err) => console.error(err));
  };

  const handleSelectChange = (e) => {
    setAmount(parseInt(e.target.value));
    resetPage();
  };

  const deleteItem = (e) => {
    const id = e.target.name;
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
              <div key={`guest-${i}`}>
                <p>
                  {capName} {capSurname}{" "}
                  {bus ? "// quiere bus" : "// no quiere bus"}
                </p>
                <button name={_id} onClick={editItem}>
                  Editar
                </button>
                <button name={_id} onClick={deleteItem}>
                  Borrar
                </button>
              </div>
            );
          }
        });
      } else if (section === "messages") {
        fullList = list.map((item, i) => {
          let { _id, author, message } = item;
          return (
            <div key={`message-${i}`}>
              <p>
                {author}: {message}
              </p>
              <button name={_id} onClick={editItem}>
                Editar
              </button>
              <button name={_id} onClick={deleteItem}>
                Borrar
              </button>
            </div>
          );
        });
      }
    } else {
      //Errors or no items.
    }
    return fullList;
  };

  const listItem = createListItem();

  if (edit.length > 0) {
    return <Edit id={edit} section={section} closeEditItem={closeEditItem} />;
  } else {
    return (
      <Fragment>
        <h3>Lista</h3>
        <div>{listItem}</div>

        <Pages pages={pages} changePage={changePage} />
        <select onChange={handleSelectChange}>
          <option>15</option>
          <option>30</option>
          <option>50</option>
        </select>
      </Fragment>
    );
  }
}
