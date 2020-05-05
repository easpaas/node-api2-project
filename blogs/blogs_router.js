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

// Returns a blog post when given a valid id
router.get('/:id', (req, res) => {
  db.findById(req.params.id)
    .then(post => {
      res.status(200).json(post);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: 'Error retrieving the blogs',
      });
    });
});

// Adds a blog post 
router.post('/', (req, res) => {
  db.insert(req.body)
    .then(post => {res.status(201).json(post)})
    .catch(error => {
      res.status(500).json({
        message: 'Error add a new blog',
      })
    });
});


module.exports = router;
