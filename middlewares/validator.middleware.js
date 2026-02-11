// middleware creator

// פונקציה שבודקת את הבאדי שנשלח לפי הסכמה שנשלחה
export const joiValidator = (joiSchema) => {
    const mdl = (req, res, next) => {
        const { error, value } = joiSchema.validate(req.body);

        // לא תקין
        if (error) {
            return next({ error });
        }

        // תקין
        req.body = value;
        next(); // עובר למידלוואר הבא
    };

    return mdl;
}

