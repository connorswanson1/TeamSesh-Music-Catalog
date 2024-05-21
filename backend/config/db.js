const mongoose = require('mongoose');
const url = require('url');

const dbURI = process.env.MONGO_URI; // Make sure this is defined in your .env file
const proxy = url.parse(process.env.QUOTAGUARDSTATIC_URL);

const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    auth: {
        user: process.env.MONGO_USER,
        password: process.env.MONGO_PASSWORD,
    },
    proxy: {
        protocol: proxy.protocol,
        hostname: proxy.hostname,
        port: proxy.port,
        auth: proxy.auth,
    },
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
