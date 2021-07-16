import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import { capitalize } from "../../tools/capitalize";
import Pages from "./Pages";

export default function List({ section }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [amount, setAmount] = useState(15);
  const [list, setList] = useState([]);
  const [warnings, setWarnings] = useState(""); //TODO: Use warinngs in case there is no items in list or errors.

  useEffect(() => {
    fetchPages();
    fetchList();
  }, [section, currentPage, amount]);

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

  const changePage = (e) => {
    setCurrentPage(parseInt(e.target.textContent));
  };

  const handleSelectChange = (e) => {
    setAmount(parseInt(e.target.value));
    setCurrentPage(1);
  };

  const deleteItem = (e) => {
    const { id } = e.target;

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
          let { name, surname, bus } = item;
          if (name) {
            //Check if name exists. Section change before list, so message list enter in this if condicional.
            let capName = capitalize(name);
            let capSurname = capitalize(surname);
            return (
              <p key={`guest-${i}`}>
                {capName} {capSurname}{" "}
                {bus ? "// quiere bus" : "// no quiere bus"}
              </p>
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
              <button>Editar</button>
              <button id={_id} onClick={deleteItem}>
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
