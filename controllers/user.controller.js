import { generateToken, User } from "../models/user.model.js";

export const login = async (req, res, next) => {
    try {
        const user = await User.findOne({ email: req.body.email });

        if (!user || !user.checkPassword(req.body.password)) {
            return next({ status: 400, msg: `login failed` });
        }

        // user.password = '****';
        // res.json(user);

        const myToken = generateToken(user);
        // בנוסף לטוקן נחזיר פרטים נוספים שנרצה להציג בקליינט
        res.json({ username: user.username, token: myToken });
    } catch (error) {
        return next({ status: 400, msg: `login failed` });
    }
};

export const register = async (req, res, next) => {
    try {
        // TODO: check why `req.files` is undefined
        // console.log(req.files);
        // console.log(req.files.advatar);

        const user = new User(req.body);
        await user.save(); // מצפין את הסיסמא לפני השמירה
        // res.status(201).json(user);

        const myToken = generateToken(user);
        // בנוסף לטוקן נחזיר פרטים נוספים שנרצה להציג בקליינט
        res.status(201).json({ username: user.username, token: myToken });
    } catch (error) {
        return next({ status: 500, msg: error.message });
    }
};