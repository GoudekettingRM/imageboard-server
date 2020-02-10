const { Router } = require("express");
const { toJWT, toData } = require("./jwt");
const User = require("../User/model");
const bcrypt = require("bcrypt");
const auth = require("./middleware");

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
      if (!user) {
        res
          .status(400)
          .send({ message: "Invalid login" })
          .end();
      } else if (bcrypt.compareSync(password, user.password)) {
        res.send({
          jwt: toJWT({ userId: user.id })
        });
      } else {
        res.status(400).send({
          message: "Invalid login"
        });
      }
    }
  } catch (error) {
    next(error);
  }
});

router.get("/secret-endpoint", auth, async (req, res, next) => {
  res.send({
    message: `Thanks for visiting the secret endpoint, ${req.user.email}`
  });
});

module.exports = router;
