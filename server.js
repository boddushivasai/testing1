const express = require('express');
const bodyParser = require('body-parser');

const app = express();

// Parse JSON bodies
app.use(bodyParser.json());

let data = []; // This will be your in-memory data store

// List items
app.get('/items', (req, res) => {
  res.json(data);
});

// Get a single item
app.get('/items/:id', (req, res) => {
  const item = data.find(i => i.id === req.params.id);
  res.json(item);
});

// Create a new item
app.post('/items', (req, res) => {
  data.push(req.body);
  res.json(req.body);
});

// Update an item
app.put('/items/:id', (req, res) => {
  const index = data.findIndex(i => i.id === req.params.id);
  data[index] = req.body;
  res.json(req.body);
});

// Delete an item
app.delete('/items/:id', (req, res) => {
  data = data.filter(i => i.id !== req.params.id);
  res.json({ message: `Item ${req.params.id} deleted` });
});

// Start the server
app.listen(3000, () => console.log('Server started on port 3000'));