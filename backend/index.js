const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default to 3001

const cors = require('cors');
app.use(cors());

app.use(express.json()); // Middleware for parsing JSON bodies

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
