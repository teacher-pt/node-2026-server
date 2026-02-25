import bcrypt from 'bcrypt';
import Joi from "joi";
import { model, Schema } from "mongoose";
import jwt from 'jsonwebtoken';

// ניצור פונקציה שמקבלת את הנתונים שקשורים להרשאות
// ויוצרת מהם טוקן
// בתוספת למחרוזת סודית שמוגדרת בפרויקט
export const generateToken = ({ role, _id }) => {
    const authData = { userID: _id, role };
    const secretKey = process.env.JWT_SECRET ?? 'secretKey';
    const token = jwt.sign(authData, secretKey,
        {
            // הטוקן תקף לדקה אחת בלבד
            // expiresIn: '1m'
            // אם לא נשים יהיה תקף תמיד
        });
    return token;
};

export const userValidation = {
    login: Joi.object({
        email: Joi.string().lowercase().required(),
        password: Joi.string().required()
    }),
    register: Joi.object({
        username: Joi.string().required(),
        password: Joi.string()
            .min(8)
            .max(30)
            .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})/)
            .required()
            .messages({
                'string.pattern.base': 'Password must contain at least one uppercase, lowercase, number, and special character.',
                'string.min': 'Password must be at least 8 characters long.',
            }),
        confirmPassword: Joi.ref('password'),
        email: Joi.string().email().lowercase().required(),
        advatar: Joi.string()
    }),
    // updatePassword
};

const userSchema = new Schema({
    username: String,
    password: String,
    email: { type: String, unique: true },
    advatarUrl: String,
    role: { type: String, default: 'user' }
});

// פעולה שקורית לפני שמירה של יוזר
// this-הפונקציה לא יכולה להיות פונקצית חץ כי היא משתמשת ב
userSchema.pre('save', async function () {
    if (this.isModified('password')) {
        // this - היוזר הנוכחי שרוצים לשמור בדטהבייס
        // הצפנת הסיסמא לפני השמירה בדטהבייס
        this.password = await bcrypt.hash(this.password, 12);
    }
    // auto store hash in your password DB.
    // next(); // להמשיך לשמירה - לא חובה
});

// methods - מתודה על האוביקט
// statics - פעולה סטטית בלי גישה לזיס
userSchema.methods.checkPassword = async function (newPassword) {
    // this - משתמש שעומדים עליו עם הסיסמא המוצפנת
    // compare - מחזיר האם הסיסמאות תואמות
    return await bcrypt.compare(newPassword, this.password);
};

export const User = model('users', userSchema);