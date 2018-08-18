const express = require('express');

const app = express();

const PORT = process.env.port || 4444;

app.listen(PORT, () => {
  console.log(`Server listening on PORT ${PORT}`);
});
