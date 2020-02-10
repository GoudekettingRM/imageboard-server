const { Router } = require("express");
const { toJWT, toData } = require("./jwt");

const router = new Router();

router.post("/login", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email) {
      res
        .status(400)
        .send("No email provided")
        .end();
    }
    if (!password) {
      res
        .status(400)
        .send("No password provided")
        .end();
    }

    res.send({
      jwt: toJWT({ userId: 1 })
    });
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
