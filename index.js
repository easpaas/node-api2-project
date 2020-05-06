const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

const postRouter = require('./posts/posts_router');
// const commentRouter = require('./comments/comments_router');

server.get('/', (req, res) => {
  res.json("Server is running.")
})

server.use('/api/posts', postRouter);

server.listen(8000, () => console.log('API running on port 8000'));