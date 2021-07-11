import React, { Fragment, useState, useEffect } from "react";
import { HOST, APIPORT } from "../../tools/constants";

export default function GuestList() {
  const [page, setPage] = useState(1);
  const [guestsList, setGuestsList] = useState([]);

  useEffect(() => {
    fetchGuests();
  }, []);

  const fetchGuests = () => {
    const guestUrl = `/api/guests/page/${page}`;
    fetch(`${HOST}${APIPORT}${guestUrl}`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setGuestsList(data);
      })
      .catch((err) => console.error(err));
  };

  const listComponent =
    guestsList.length > 0
      ? guestsList.map((guest, i) => {
          return <p key={`guest-${i}`}>{guest.name}</p>;
        })
      : "Cargando";

  return (
    <Fragment>
      <h3>Lista de invitados en Admin</h3>
      <div>{listComponent}</div>
    </Fragment>
  );
}
