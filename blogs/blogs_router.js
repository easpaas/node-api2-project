const express = require("express");

const db = require("../data/db");

const router = express.Router();

// by the time we reach this router the URL has /api/blogs
// so we only need to handle the rest of the URL
router.get("/", (req, res) => {
  db.find()
    .then(blogs => {
      res.status(200).json(blogs);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the blogs",
      });
    });
});

router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(blog => {
      res.status(200).json(blog);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the blogs',
      });
    });
});

module.exports = router;
