import React, { Fragment } from "react";
import Header from "./Header";
import Congratulations from "./Congratulations";
import Guests from "./Guests";

export default function Home() {
  return (
    <Fragment>
      <Header />
      <Congratulations />
      <Guests />
      <a
        target="blank"
        href="https://www.google.es/maps/place/Finca+La+Estaci%C3%B3n/@40.7997184,-4.2086465,16.42z/data=!4m5!3m4!1s0xd4110cb518df2d5:0x15b3ad6552e8e2cf!8m2!3d40.7994051!4d-4.20524?hl=es"
      >
        La estación
      </a>
    </Fragment>
  );
}
