const express = require('express');
const db = require('./data/db');

const server = express();
server.use(express.json());

const blogRouter = require('./blogs/blogs_router');

server.get('/', (req, res) => {
  res.json("Server is running.")
})

server.use('/api/blogs', blogRouter);

server.listen(8000, () => console.log('API running on port 8000'));