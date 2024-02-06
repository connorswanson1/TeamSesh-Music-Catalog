const mongoose = require('mongoose');

const dbURI = process.env.MONGO_URI; // Make sure this is defined in your .env file

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // ... any other options you might need
};

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, options);
        console.log("Successfully connected to MongoDB.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
