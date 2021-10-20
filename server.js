const express = require("express");
const webpack = require("webpack");
const webpackDevMiddleware = require("webpack-dev-middleware");
const webpackHotMiddleware = require("webpack-hot-middleware");
const webpackConfig = require("./webpack.config");
const jwt = require("jsonwebtoken");
const cookieParser = require("cookie-parser");
const dotenv = require("dotenv");
const { LOCALPORT } = require("./src/tools/constants");

const PORT = process.env.PORT || LOCALPORT;

//Config dotenv
if (process.env.NODE_ENV !== "production") {
  dotenv.config();
}

const app = express();

app.use(webpackDevMiddleware(webpack(webpackConfig)));
app.use(webpackHotMiddleware(webpack(webpackConfig)));

app.use(cookieParser());

//Verify if user have token
const auth = (request, response, next) => {
  if (!request.url.includes("/admin")) {
    return next();
  }
  jwt.verify(request.cookies.token, process.env.SEED_AUTH, (error, data) => {
    if (error) {
      response.redirect("/login");
    } else {
      next();
    }
  });
};

app.use(express.static(__dirname + "/public"));

app.use(
  auth,
  express.static(__dirname + "/public/html", { extensions: ["html"] })
);

app.use(
  "/",
  express.static(__dirname + "/node_modules/@fortawesome/fontawesome-free/")
);

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
