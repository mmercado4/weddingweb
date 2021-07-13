import React, { Fragment } from "react";

export default function Pages(props) {
  let { pages, changePage } = props;
  let arrPages = [];
  for (let i = 1; i <= pages; i++) {
    arrPages.push(i);
  }
  let pagesComponent = arrPages.map((page, i) => {
    return (
      <p key={`page-${i}`} onClick={changePage}>
        {page}
      </p>
    );
  });
  return <Fragment>{pagesComponent}</Fragment>;
}
