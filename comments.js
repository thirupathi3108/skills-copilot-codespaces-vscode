// Create web server
// Load the express library
const express = require('express');
const app = express();

// Load the body-parser library
const bodyParser = require('body-parser');
app.use(bodyParser.json());

// Load the comments data
const comments = require('./comments-data.js');

// Load the CORS library
const cors = require('cors');
app.use(cors());

// Create a new comment
app.post('/api/comments', (req, res) => {
  const newComment = req.body;
  newComment.id = comments.length + 1;
  comments.push(newComment);
  res.json(newComment);
});

// Get all comments
app.get('/api/comments', (req, res) => {
  res.json(comments);
});

// Get a comment by id
app.get('/api/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const comment = comments.find(c => c.id === id);
  if (comment) {
    res.json(comment);
  } else {
    res.status(404).json({
      error: `Comment with id ${id} not found`
    });
  }
});

// Update a comment by id
app.put('/api/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const updatedComment = req.body;
  updatedComment.id = id;
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments[index] = updatedComment;
    res.json(updatedComment);
  } else {
    res.status(404).json({
      error: `Comment with id ${id} not found`
    });
  }
});

// Delete a comment by id
app.delete('/api/comments/:id', (req, res) => {
  const id = Number(req.params.id);
  const index = comments.findIndex(c => c.id === id);
  if (index !== -1) {
    comments.splice(index, 1);
    res.json({});
  } else {
    res.status(404).json({
      error: `Comment with id ${id} not found`
    });
  }
});

// Start the server
app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000/');
});