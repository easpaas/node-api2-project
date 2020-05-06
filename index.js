const express = require('express');
const db = require('./data/db');
const cors = require('cors');

const server = express();
server.use(cors());
server.use(express.json());

const postRouter = require('./posts/posts_router');

server.get('/', (req, res) => {
  res.json("Server is running.")
})

server.use('/api/posts', cors(), postRouter);

server.listen(8000, () => console.log('API running on port 8000'));