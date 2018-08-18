const express = require('express');
const mongoose = require('mongoose');
const Recipe = require('./models/Recipe');
const User = require('./models/User');

require('dotenv').config({ path: 'variables.env' });

// Connects to database
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log('DB connected'))
  .catch(err => console.error(err));

// Initializes application
const app = express();

const PORT = process.env.port || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
