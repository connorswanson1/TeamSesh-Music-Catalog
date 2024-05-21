const mongoose = require('mongoose');
const url = require('url');

const dbURI = process.env.MONGO_URI; // Make sure this is defined in your .env file
const proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    proxy: {
        proxyUsername: new URL(proxyUrl).username,
        proxyPassword: new URL(proxyUrl).password,
        proxyHostname: new URL(proxyUrl).hostname,
        proxyPort: new URL(proxyUrl).port
    }
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
