const LOCALPORT = 3434;
let HOST;
let APIPORT;

if (process.env.NODE_ENV === "production") {
  HOST = "https://weddingmc-api.herokuapp.com";
  APIPORT = "";
} else {
  HOST = "http://localhost:";
  APIPORT = 3333;
}

module.exports = {
  LOCALPORT: LOCALPORT,
  HOST: HOST,
  APIPORT: APIPORT,
};
