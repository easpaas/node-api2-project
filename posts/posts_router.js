const express = require("express");

const db = require("../data/db");

const router = express.Router();

/*
 * ****************
 *  Posts CRUD
 * ***************
 */

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

  if (!req.body.title || !req.body.contents) {
    res.status(400).json({ errorMessage: 'Please provide title and contents for the post'});
  } 

  db.insert(req.body)
    .then(post => {
      res.status(201).json(post)
    })
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

/*
 * ****************
 * Comment CRUD
 * ***************
 */

//  Return comments when given a valid post Id
router.get("/:id/comments", (req, res) => {
  const id = req.params.id;
  db.findPostComments(id)
    .then(comments => {
      comments ?
        res.status(200).json(comments) 
      :
        res.status(404).json({ message: 'Post could not be found'});
    })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Trouble connecting to server'})
    });
})

// // Return comment by id 
// router.get('/comments/:id', (req, res) => {
//   db.findCommentById(id)
//     .then(comment => {
//       comment ?
//         res.status(200).json(comment)
//       :
//         res.status(404).json({ message: 'Comment could not be found'})
//     })
//     .catch(error => {
//       res.status(500).json({ errorMessage: 'Trouble connecting to server'});
//     })
// })

// Return successful comment 
router.post('/:id/comments', (req, res) => {
  const post_id = req.params.id;
  const comment = req.body;

  if (!req.body.text) {
    res.status(400).json({ errorMessage: 'Please provide text for the comment.'});
  }

  db.insertComment(comment)
    .then(post => {
      post ? 
        res.status(201).json(post)
      :
        res.status(404).json({ meessage: 'Could not add comment with unknown post id'})
      })
    .catch(error => {
      console.log(error)
      res.status(500).json({ errorMessage: 'Trouble connecting to server'});
    });
});

module.exports = router;
