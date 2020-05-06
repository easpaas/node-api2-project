const express = require("express");

const db = require("../data/db");

const router = express.Router();

router.get("/:id", (req, res) => {
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

module.exports = router;
