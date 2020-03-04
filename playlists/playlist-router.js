const express = require("express");

const playlists = require("./playlist-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  playlists
    .findAll()
    .then(playlist => {
      res.json(playlist);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get all playlists" });
    });
});

router.get("/:id", (req, res) => {
    const { id } = req.params;
    playlists.find(id)
        .then(playlist => {
            res.json(playlist);
        })
        .catch(err => {
            res.status(500).json({ message: "Failed to get playlist" });
        });
});

router.post("/:id", (req, res) => {
  const playListData = req.body;
  console.log(playListData);
  const { id } = req.params;
  const playlistFull = { ...playListData, user_id: id };

  playlists
    .add(playlistFull, id)
    .then(playlist => {
      res.status(201).json(playlist);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new playlist" });
    });
});

module.exports = router;