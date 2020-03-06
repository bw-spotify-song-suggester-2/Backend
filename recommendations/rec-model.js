const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findById,
  findRecs,
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

function findRecs(id) {
  return db("recommendations")
    // .select("user_id", "user_id", "artist", "album", "song")
    .where("user_id", id);
}

function add(rec) {
  return db("recommendations")
    .insert(rec)
    .returning("id")
    .then(([id]) => {
      return findById(id);
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
