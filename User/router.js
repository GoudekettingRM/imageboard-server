const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");

const router = new Router();

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send(
          "please provide both an email and a password to create a new account"
        )
        .end();
    }
    await User.create({
      email,
      password: bcrypt.hashSync(req.body.password, 10)
    });
    res.send("Account created!");
  } catch (error) {
    next(error);
  }
});

module.exports = router;
