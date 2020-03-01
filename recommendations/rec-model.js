const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findSteps,
  add,
  update,
  remove
};

function find() {
  return db("recommendations");
}

function findById(id) {
  return db("recommendations")
    .where({ id })
    .first();
}

function findSteps(id) {
  return db("recommendations")
    .select("users.id", "artist", "album", "song")
    .from("recommendations")
    .join("users", { "users.id": "recommendations.user_id" })
    .where({ user_id: id })
    .orderBy("recommendations", "asc");
}

function add(rec) {
  db("recommendations")
    .insert(rec)
    .then(ids => {
      return findById(ids[0]);
    });
}

function update(changes, id) {
  return db("recommendations")
    .where("id", id)
    .update(changes)
    .then(count => (count > 0 ? this.get(id) : null));
}

function remove(id) {
  return db("recommendations")
    .where("id", id)
    .del();
}
