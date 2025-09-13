// import mongoose from "mongoose";

// export const connectDB = async (req, res) => {
//     const db = process.env.MONGO_URL;

//     const {connection} = await mongoose.connect(db, { useNewUrlParser: true });

//     console.log(`MongoDB Connected to ${connection.host}`);

// }

import mongoose from 'mongoose';

export const connectDB = async () => {
    try {
        // Make sure you are using process.env.MONGO_URI here
        await mongoose.connect(process.env.MONGO_URI);
        console.log('MongoDB connection SUCCESS');
    } catch (error) {
        console.log('MongoDB connection FAILED');
        console.error(error);
        process.exit(1);
    }
};