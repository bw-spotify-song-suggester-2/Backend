const bcrypt = require("bcryptjs");

exports.seed = function(knex) {
  return knex("users").insert([
    {
      firstName: "First",
      lastName: "Last",
      username: "first",
      email: "first.last@gmail.com",
      password: bcrypt.hashSync("first", 10)
    }
  ]);
};