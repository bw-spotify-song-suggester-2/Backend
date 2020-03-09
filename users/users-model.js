const db = require("../data/dbConfig.js");

module.exports = {
  add,
  find,
  findBy,
  findById,
  update
};

function find() {
  return db("users");
}

function findBy(filter) {
  return db("users").where(filter);
}

async function add(user) {
  return await db("users").insert(user);
}

function findById(id) {
  return db("users")
    .where({ id })
    .first();
}

function update(changes, id) {
  return db("users")
    .where({ id })
    .first()
    .update(changes);
}