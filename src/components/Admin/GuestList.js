import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";
import Pages from "./Pages";

//Deberíamos generalizarlo para con una variable, que te traiga un listado u otro.

export default function GuestList() {
  const [section, setSection] = useState("guests");
  const [currentPage, setCurrentPage] = useState(1);
  const [pages, setPages] = useState(0);
  const [amount, setAmount] = useState(15);
  const [list, setList] = useState([]);

  useEffect(() => {
    fetchPages();
    fetchList();
  }, [amount]);

  const fetchList = () => {
    const listUrl = `/api/${section}/page/${currentPage}`;
    fetch(`${HOST}${APIPORT}${listUrl}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
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
  };

  const listComponent =
    list.length > 0
      ? list.map((item, i) => {
          return <p key={`item-${i}`}>{item.name}</p>; //OJOCON LO DE .NAME
        })
      : "Cargando";

  return (
    <Fragment>
      <h3>Lista de invitados en Admin</h3>
      <div>{listComponent}</div>

      <Pages pages={pages} changePage={changePage} />
      <select onChange={handleSelectChange}>
        <option>15</option>
        <option>30</option>
        <option>50</option>
      </select>
    </Fragment>
  );
}
