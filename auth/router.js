const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../User/model");
const bcrypt = require("bcrypt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send({ message: "Please provide a valid email and password" })
        .end();
    } else {
      const user = await User.findOne({
        where: {
          email: email
        }
      });
      console.log("in first else statement");

      if (!user) {
        res
          .status(404)
          .send({ message: "No user found with this email" })
          .end();
      } else if (bcrypt.compareSync(password, user.password)) {
        res.send({
          jwt: toJWT({ userId: user.id })
        });
      } else {
        res.status(400).send({
          message: "Password was incorrect"
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/secret-endpoint", async (req, res, next) => {
  const auth =
    req.headers.authorization && req.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      res.send({
        message: "Thanks for visiting the secret endpoint.",
        data
      });
    } catch (error) {
      res
        .status(400)
        .send({ message: `Error ${error.name}: ${error.message}` });
    }
  } else {
    res.status(401).send({
      message: "Please supply some valid credentials"
    });
  }
});

module.exports = router;
