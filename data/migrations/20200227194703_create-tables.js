
exports.up = function(knex) {
  return knex.schema
    .createTable("users", users => {
      users.increments();
      users.string("firstName", 255).notNullable();
      users.string("lastName", 255).notNullable();
      users
        .string("username", 255)
        .notNullable()
        .unique();
      users
        .string("email", 255)
        .notNullable()
        .unique();
      users.string("password", 255).notNullable();
    })
    .createTable("playlists", recommendation => {
      recommendation.increments();
      recommendation.string("spotify_playlist", 255).notNullable();
      recommendation
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    })
    .createTable("recommendations", recommendation => {
      recommendation.increments();
      recommendation.string("artist", 255).notNullable();
      recommendation.string("album", 255).notNullable();
      recommendation.string("song", 255).notNullable();
      recommendation.string("track_id", 255).notNullable();
      recommendation
        .integer("user_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("users")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
      recommendation
        .integer("playlist_id")
        .unsigned()
        .notNullable()
        .references("id")
        .inTable("playlists")
        .onUpdate("CASCADE")
        .onDelete("CASCADE");
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("recommendations")
    .dropTableIfExists("playlists")
    .dropTableIfExists("users");
};
