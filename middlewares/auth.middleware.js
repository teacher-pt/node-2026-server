import jwt from "jsonwebtoken";

export const isAuth = (req, res, next) => {
    try {
        // Bearer מניחים שאם יש טוקן הוא מסוג
        const [, token] = req.headers.authorization.split(' ');
        const secretKey = process.env.JWT_SECRET ?? 'secretKey';

        // אם חוקי ובתוקף - מחזיר את הנתונים שקודדו ועובר למידלוואר הבא
        // אחרת - זורק שגיאה
        const payload = jwt.verify(token, secretKey);
        req.myUser = payload;

        next();
    } catch (error) {
        // אם יש שגיאה הולך למידלוואר של השגיאות
        return next({ status: 401, msg: `authentication failed` });
    }
};

export const isRoleMatch = (roles = []) => {
    return (req, res, next) => {
        if (!roles.includes(req.myUser.role)) {
            return next({ status: 403, msg: `forbidden - method does not allowed` });
        }
        return next();
    };
}