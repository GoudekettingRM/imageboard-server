const { Router } = require("express");
const bcrypt = require("bcrypt");
const User = require("./model");

function validateEmail(mail) {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return true;
  }
  return false;
}

const router = new Router();

router.post("/", async (req, res, next) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res
        .status(400)
        .send(
          "Please provide both an email and a password to create a new account"
        )
        .end();
    }
    if (!validateEmail(email)) {
      res
        .status(400)
        .send("Entered email is not a valid email address.")
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
