const express = require('express');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;

// Serve static files (the site and images)
app.use(express.static(path.join(__dirname)));

// -- API removed: the site now loads local JSON files directly (no API endpoints) --
// The server continues to serve static files from the repo root.

const server = app.listen(port, () => {
  console.log(`Wanderlust static server running at http://localhost:${port}`);
});

server.on('error', (err) => {
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} already in use. Is another instance running?`);
  } else {
    console.error('Server error:', err);
  }
  // do not swallow errors to make debugging easier
  process.exit(1);
});
