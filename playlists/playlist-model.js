const db = require("../data/dbConfig.js");

module.exports = {
  find,
  findAll,
  add,
  remove
};

function findAll() {
  return db("playlists")
}

function find(userId) {
  return db("playlists")
    .select(
      "recommendations.artist",
      "recommendations.album",
      "recommendations.song"
    )
    .from("playlists")
    .join("recommendations", { "playlists.id": "recommendations.playlist_id" })
    .where("playlists.user_id", userId);
}

function add(playlist, userId) { 
  return db("playlists")
    .insert(playlist)
    .returning("id");
    // .then(([id]) => {
    //   return id;
    // });
}

function remove(id) {
  return db("playlists")
    .where("id", id)
    .del();
}