// connection string מחרוזת התחברות לדטהבייס

import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        const DB_URI = `mongodb://localhost:27017/storeDB`;
        await connect(DB_URI);
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
    }
};