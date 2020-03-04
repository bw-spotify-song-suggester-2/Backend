
exports.seed = function(knex) {
  return knex("playlists").insert([
    {
      spotify_playlist: "1CND0rV8qPsS3NToOoWXcq?si=v7vPylwET3-j41OVk259kA",
      user_id: "1"
    },
    {
      spotify_playlist: "1CND0rV8qPsS3NToOoWXcq?si=v7vPylwET3-j41OVk259kA",
      user_id: "1"
    },
    {
      spotify_playlist: "5vBQ35wpIzaCTKFMCYrJqQ?si=0qNZHakiRIGsGDbXUyGH8w",
      user_id: "2"
    },
    {
      spotify_playlist: "5vBQ35wpIzaCTKFMCYrJqQ?si=0qNZHakiRIGsGDbXUyGH8w",
      user_id: "2"
    }
  ]);
};