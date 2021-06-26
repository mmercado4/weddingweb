import React, { Fragment } from "react";
import Header from "./Header";
import Congratulations from "./Congratulations";
import Guests from "./Guests";

function App() {
  return (
    <Fragment>
      <Header />
      <Congratulations />
      <Guests />
    </Fragment>
  );
}

export default App;
