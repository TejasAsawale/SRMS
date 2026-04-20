const mongoose = require('mongoose');
const dotenv = require('dotenv');

dotenv.config(); 

async function connectdb() {
    try {
        await mongoose.connect(process.env.MONGO_URI); 
        console.log("Connected to MongoDB successfully!");
    } catch (error) {
        console.error("Error in connection:", error.message);
        process.exit(1); 
    }
}

module.exports = { connectdb };

// mongodb://localhost:27017

