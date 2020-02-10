const Sequelize = require("sequelize");
const databaseURL =
  process.env.DATABASE_URL ||
  "postgres://postgres:puppies@localhost:5432/postgres";
const db = new Sequelize(databaseURL);

db.sync()
  .then(() => console.log("database synced"))
  .catch(error => console.error(error));

module.exports = db;
