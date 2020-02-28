const express = require("express");

const Recs = require("./rec-model.js");

const router = express.Router();

router.get("/", (req, res) => {
  Recs.find()
    .then(recs => {
      res.json(recs);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get recommendations" });
    });
});

router.get("/:id", (req, res) => {
  const { id } = req.params;

  Recs.findById(id)
    .then(rec => {
      if (rec) {
        res.json(rec);
      } else {
        res
          .status(404)
          .json({ message: "Could not find recommendation with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get recommendations" });
    });
});

router.get("/:id/recs", (req, res) => {
  const { id } = req.params;

  Recs.findRecs(id)
    .then(recs => {
      if (recs.length) {
        res.json(recs);
      } else {
        res
          .status(404)
          .json({ message: "Could not find recs for given user" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to get recs" });
    });
});

router.post("/", (req, res) => {
  const recData = req.body;

  Recs.add(recData)
    .then(rec => {
      res.status(201).json(rec);
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new recommendation" });
    });
});

router.post("/:id/steps", (req, res) => {
  const stepData = req.body;
  const { id } = req.params;

  Recs.findById(id)
    .then(scheme => {
      if (scheme) {
        Recs.addStep(stepData, id).then(step => {
          res.status(201).json(step);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id." });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to create new step" });
    });
});

router.put("/:id", (req, res) => {
  const { id } = req.params;
  const changes = req.body;

  Recs.findById(id)
    .then(scheme => {
      if (scheme) {
        Recs.update(changes, id).then(updatedScheme => {
          res.json(updatedScheme);
        });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to update scheme" });
    });
});

router.delete("/:id", (req, res) => {
  const { id } = req.params;

  Recs.remove(id)
    .then(deleted => {
      if (deleted) {
        res.json({ removed: deleted });
      } else {
        res
          .status(404)
          .json({ message: "Could not find scheme with given id" });
      }
    })
    .catch(err => {
      res.status(500).json({ message: "Failed to delete scheme" });
    });
});

module.exports = router;
