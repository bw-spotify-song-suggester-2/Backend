exports.seed = function(knex) {
  return knex("recommendations").insert([
    {
      artist: "Hot Chip",
      album: "Why Make Sense?",
      song: "Huarache Lights",
      track_id: "lkjasdfoji",
      user_id: "1",
      playlist_id: "1"
    },
    {
      artist: "Kavinsky",
      album: "Nightcall",
      song: "Nightcall",
      track_id: "lkjasdfoji",
      user_id: "1",
      playlist_id: "1"
    },
    {
      artist: "Radiohead",
      album: "Kid A",
      song: "Everything in its right place",
      track_id: "lkjasdfoji",
      user_id: "2",
      playlist_id: "2"
    },
    {
      artist: "TV on the Radio",
      album: "Seeds",
      song: "Quartz",
      track_id: "lkjasdfoji",
      user_id: "2",
      playlist_id: "2"
    }
  ]);
};