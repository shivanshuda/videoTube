import mongoose from "mongoose";
import { DB_NAME } from "../constant.js";

console.log("Connection URI:", process.env.MONGODB_URI);
console.log("Database Name:", DB_NAME);


const connectDB = async () => {
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DB_NAME}`);
        console.log(`\n MongoDB connected !! DB HOST: ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log(error);
        // throw error;
        process.exit(1);
    }
}

export default connectDB;