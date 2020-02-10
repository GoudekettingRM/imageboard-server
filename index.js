const express = require("express");
const cors = require("cors");
const db = require("./db");
const Image = require("./Image/model");

const port = process.env.PORT || 4000;
const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const bodyParser = express.json();
app.use(bodyParser);

function onListen() {
  console.log(`Listening on port :${port}`);
}

app.listen(port, onListen);
