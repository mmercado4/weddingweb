import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import Pages from "./Pages";

export default function List() {
  const [section, setSection] = useState("guests");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [amount, setAmount] = useState(15);
  const [list, setList] = useState([]);
  const [warnings, setWarnings] = useState(""); //TODO: Use warinngs in case there is no items in list or errors.

  useEffect(() => {
    fetchPages();
    fetchList();
  }, [amount, currentPage]);

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
        let numberOfPages = Math.ceil(data.length / amount); //TODO: No tiene en cuenta en la cantidad los acompañantes.
        setPages(numberOfPages);
      })
      .catch((err) => console.error(err));
  };

  const changePage = (e) => {
    setCurrentPage(parseInt(e.target.textContent));
  };

  const handleSelectChange = (e) => {
    setAmount(parseInt(e.target.value));
  };

  const createListItem = () => {
    let fullList;
    let fullCompanionList;
    if (list.length > 0) {
      //Check section.
      if (section === "guests") {
        fullList = list.map((item, i) => {
          let { _id, name, bus, email, companions } = item; //***************TODO NO ME SALEN LOS KEYS CORRECTOS. HACEMOS VARIAS INSERCIONES A LA BASE DE DATOS??? */
          if (companions.length > 0) {
            fullCompanionList = companions.map((companion, i) => {
              return (
                <p key={`companion-${i}-${item._id}`}>
                  {companion.companionName}
                </p>
              );
            });
            return fullCompanionList;
          }
          return (
            <Fragment>
              <p key={`guest-${i}`}>{name}</p>
              {fullCompanionList}
            </Fragment>
          );
        });
        return fullList;
      } else if (section === "messages") {
        //TODO MESSAGES
      }
    } else {
      //Errors or no items.
    }
  };

  const listItem = createListItem();

  return (
    <Fragment>
      <h3>Lista de invitados en Admin</h3>
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
