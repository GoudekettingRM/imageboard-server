const Sequelize = require("sequelize");
const db = require("../db");

const Image = db.define("image", {
  url: {
    type: Sequelize.STRING,
    allowNull: false
  },
  title: {
    type: Sequelize.STRING,
    defaultValue: "No title set"
  }
});

module.exports = Image;
