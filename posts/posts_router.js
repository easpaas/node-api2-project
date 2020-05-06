const express = require("express");

const db = require("../data/db");

const router = express.Router();

// by the time we reach this router the URL has /api/posts
// so we only need to handle the rest of the URL
router.get("/", (req, res) => {
  db.find()
    .then(posts => {
      res.status(200).json(posts);
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: "Error retrieving the posts",
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
        message: 'Error retrieving the posts',
      });
    });
});

// Adds a blog post 
router.post('/', (req, res) => {
  db.insert(req.body)
    .then(post => {res.status(201).json(post)})
    .catch(error => {
      console.log(error)
      res.status(500).json({
        message: 'Error adding a new blog',
      })
    });
});

// Update a blog post by valid id
router.put('/:id', (req, res) => {
  const changes = req.body;
  db.update(req.params.id, changes)
    .then(post => {
      post ? 
        res.status(200).json(post)
      :
        res.status(404).json({ message: "Blog post not found"});
    })
    .catch(error => {
      console.log(error);
      res.status(500).json({
        message: `Error updating post with id ${req.params.id}`
      })
    });
});

// Delete a blog post given a valid id
router.delete('/:id', (req, res) => {
  const id = req.params.id;
  db.remove(id)
    .then(id => {
      console.log(id)
      id ? 
        res.status(204).json(id)
      :
        res.status(404).json({ message: "Blog post not found"});
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ message: 'Error deleting blog post'})
    });
})


module.exports = router;
