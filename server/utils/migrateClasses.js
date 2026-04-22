const mongoose = require('mongoose');
const dotenv = require('dotenv');
const Student = require('../models/Student'); // Adjust path if needed
const Class = require('../models/Class');     // Adjust path if needed

dotenv.config();

const migrate = async () => {
    try {
        // 1. Connect to your Database
        await mongoose.connect(process.env.MONGO_URI || "your_mongodb_connection_string_here");
        console.log("Connected to MongoDB for migration...");

        // 2. Get unique Class names from your existing Students
        const uniqueClasses = await Student.distinct("ClassId");
        console.log(`Found ${uniqueClasses.length} unique classes in Students collection.`);

        // 3. Create a Master Card (Record) for each class
        for (let name of uniqueClasses) {
            if (name && name !== "Default") {
                await Class.findOneAndUpdate(
                    { ClassName: name }, 
                    { ClassName: name }, 
                    { upsert: true, new: true }
                );
                console.log(`✅ Synced: ${name}`);
            }
        }

        console.log("Migration complete! You can now see these as cards on your UI.");
        process.exit(0); // Close the script successfully
    } catch (err) {
        console.error("❌ Migration failed:", err);
        process.exit(1);
    }
};

migrate();