exports.seed = function(knex) {
  return knex("recommendations").insert([
    {
      artist: "Hot Chip",
      album: "Why Make Sense?",
      song: "Huarache Lights",
      user_id: "1"
    }
  ]);
};