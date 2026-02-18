import Joi from "joi";
import { model, Schema } from "mongoose";

// joi
// לבדיקות תקינות נשתמש בספריית עזר
// ולא בסכמה של מונגו כי
// 1. לא רוצים לערבב לוגיקה של בדיקות עם לוגיקה של דטהבייס
// 2. בדיקות של מונגו מתבצעות לפני הוספה/עדכון בדטהבייס
//    2.1. לפעמים רוצים לבצע בדיקה גם כשלא מכניסים לדטהבייס למשל בלוגין
//    2.2. אם הנתונים לא תקינים, חבל על הגישה לדטהבייס שלוקחת זמן
// 3. הספריה מכילה גם בדיקות מורכבות
// כאן אפשר ליצור הרבה סכמות
export const productValidation = Joi.object({
    name: Joi.string().required().min(2),
    price: Joi.number().positive().default(0),
    amount: Joi.number().integer().positive(),
    isSale: Joi.bool().default(false),
    productDate: Joi.date(),
    categories: Joi.array().items(Joi.string()).min(1), // מערך מחרוזות בגודל לפחות אחד
    company: Joi.object({
        name: Joi.string().required(),
        address: Joi.string().optional()// לא חובה
    })
});

// mongoose
const productSchema = new Schema({
    // _id נוצר אוטומטית אם לא כתבנו,
    name: { type: String, minLength: 2, required: true },
    price: Number,
    amount: Number,
    isSale: Boolean,
    productDate: Date,
    categories: [String], // ברירת מחדל מערך ריק
    company: {
        name: String,
        address: String
    }
});

// כך יצרנו אוסף/טבלה עבור מוצרים
const Product = model('products', productSchema);

export default Product;