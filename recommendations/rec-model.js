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

function findRecs(userId) {
  return db("recommendations")
    .select("user_id", "artist", "album", "song")
    .from("recommendations")
    .where("user_id", userId);
}

function add(rec) {
  return db("recommendations")
    .insert(rec)
    // .then(id => {
    //   return findRecs(id);
    // });
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
