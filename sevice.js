const express = require('express');
const app = express();

app.get('/', (req, res) => {
  res.send('Hello, Node.js Service is Running!');
});

app.listen(3000, '0.0.0.0', () => {
  console.log('Server is running on port 3000');
});
