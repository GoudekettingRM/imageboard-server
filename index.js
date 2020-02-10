const express = require("express");
const cors = require("cors");
const db = require("./db");

const imageRouter = require("./Image/router");
const loginRouter = require("./auth/router");
const userRouter = require("./User/router");

const port = process.env.PORT || 4000;
const app = express();

const corsMiddleware = cors();
app.use(corsMiddleware);

const bodyParser = express.json();
app.use(bodyParser);

app.use(loginRouter);
app.use("/images", imageRouter);
app.use("/users", userRouter);

function onListen() {
  console.log(`Listening on port :${port}`);
}

app.listen(port, onListen);
