const express = require('express');
const app = express();
const port = process.env.PORT || 3001; // Use environment variable or default to 3001
const cors = require('cors');

require('dotenv').config();

const mongoose = require('mongoose');
const dbURI = process.env.DB_URI;

const clientOptions = { serverApi: { version: '1', strict: true, deprecationErrors: true } };

async function run() {
    try {
        // Create a Mongoose client with a MongoClientOptions object to set the Stable API version
        mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true });
        await mongoose.connection.db.admin().command({ ping: 1 });
        console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        await mongoose.disconnect();
    }
}
run().catch(console.dir);


app.use(cors());

app.use(express.json()); // Middleware for parsing JSON bodies

// Test route
app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
