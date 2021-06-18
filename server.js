const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackConfig = require("./webpack.config");
const { LOCALPORT } = require("./src/tools/consts");
const PORT = process.env.PORT || LOCALPORT;

const app = express();

app.use(webpackDevMiddleware(webpack(webpackConfig)));

app.use(express.static(__dirname + "/public/html", { extensions: ["html"] }));

app.use(express.static(__dirname + "/public"));

// app.use(
//     "/",
//     express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/")
//   );

app.use((request, response, next) => {
  response.status(404);

  if (request.accepts("html")) {
    response.redirect("/");
    return;
  }
  if (request.accepts("json")) {
    response.send({ error: "Not found" });
    return;
  }
  response.type("txt").send("Not found");
});

app.listen(PORT, () => {
  console.log(`server is running in port ${PORT}`);
});
