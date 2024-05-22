const mongoose = require('mongoose');
require('dotenv').config();

console.log('MONGO_URI:', process.env.MONGO_URI);

const dbURI = process.env.MONGO_URI; // Make sure this is defined in your .env file

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    // Remove the unsupported proxy option
};

const connectDB = async () => {
    try {
        await mongoose.connect(dbURI, options);
        console.log('Successfully connected to MongoDB.');
    } catch (error) {
        console.error('MongoDB connection error:', error);
        process.exit(1); // Exit process with failure
    }
};

module.exports = connectDB;
