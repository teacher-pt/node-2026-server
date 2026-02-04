// connection string מחרוזת התחברות לדטהבייס

import { connect } from "mongoose";

export const connectDB = async () => {
    try {
        // אם הדטהבייס קיים מתחבר אליו
        // אם לא - יוצר חדש
        const DB_URI = process.env.MONGO_URI || `mongodb://localhost:27017/test`;
        await connect(DB_URI);
        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
    }
};