// connection string מחרוזת התחברות לדטהבייס

import mongoose, { connect } from "mongoose";

export const connectDB = async () => {
    try {
        // אם הדטהבייס קיים מתחבר אליו
        // אם לא - יוצר חדש
        const DB_URI = process.env.MONGO_URI || `mongodb://localhost:27017/test`;
        await connect(DB_URI);

        // הגדרות כל האוביקטים בדטהבייס
        mongoose.set('toJSON', {
            virtuals: true,  // Include virtual properties, id אוטומטית יש תכונה וירטואלית בשם
            transform: (doc, ret) => { // מעדכנת את האוביקט שנשלח ללקוח
                // ret - האוביקט שמוחזר אוטומטית ללקוח
                // ret.id = ret._id; // מיותר

                delete ret.__v;     // Remove the __v field from the output
                delete ret._id;
                delete ret.password;
            }
        });

        console.log('mongo connected succesfully');
    } catch (error) {
        console.log(error);
    }
};