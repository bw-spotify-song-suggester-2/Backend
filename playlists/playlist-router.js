const express = require("express");

const playlists = require("./playlist-model.js");
const recs = require("../recommendations/rec-model.js");
const axios = require('axios');
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

router.post("/:id", async (req, res) => {
  const playListData = req.body;
  const playlistId = req.body.spotify_playlist;
  const { id } = req.params;
  const playlistFull = { ...playListData, user_id: id };

  try {
    const playlistAdd = await playlists.add(playlistFull, id);
    const dsResponse = await axios.get(`https://spotify-song-suggester-2.herokuapp.com/request/?search=${playlistId}`, playlistAdd);

    const mappedDsResponse = dsResponse.data.data.map(async item => {
      const newObj = {
        artist: item.artist,
        album: item.album,
        song: item.track,
        user_id: id,
        playlist_id: playlistAdd[0]
      };
      console.log(newObj);
      const insertRecs = await recs.add(newObj);
      return insertRecs;
    });
    Promise.all(mappedDsResponse)
    .then(cb => {
      console.log(cb);
      const result = cb.map((item) => {
        return item;
      });
      res.status(201).json(result);
    })    
  } catch (err) {
    res.status(500).json({ message: "Failed to create new playlist" });
  }
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  playlists
    .remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find playlist with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete playlist" });
    });
});

module.exports = router;