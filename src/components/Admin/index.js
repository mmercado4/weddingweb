import React, { Fragment, useState } from "react";
import Logout from "./Logout";
import List from "./List";
import Aside from "./Aside";
import Resume from "./Resume";

export default function Admin() {
  const [section, setSection] = useState("resume");
  const [edit, setEdit] = useState("");

  const changeSection = (e) => {
    let section = e.target.id.split("-")[1];
    setSection(section);
    closeEditItem();
  };

  const editItem = (e) => {
    let id = e.target.name;
    setEdit(id);
  };

  const closeEditItem = () => {
    setEdit("");
  };

  let currentSection =
    section === "resume" ? (
      <Resume />
    ) : (
      <List
        section={section}
        editItem={editItem}
        edit={edit}
        closeEditItem={closeEditItem}
      />
    );

  return (
    <Fragment>
      <h1>Admin</h1>
      <Logout />
      <Aside changeSection={changeSection} />
      {currentSection}
    </Fragment>
  );
}
