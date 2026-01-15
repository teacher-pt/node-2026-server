// מידלוואר שמטפל בשגיאות מקבל 4 פרמטרים
// err - פרטי השגיאה
// כל השאר כמו מידלוואר רגיל
export const errorHandler = (err, req, res, next) => {
    // err = { status?: 400, msg?: '' }
    const sts = err.status ?? 500;
    const message = err.msg ?? 'Server Error!!!';

    res.status(sts).json({
        message: message,
        fixLink: 'http://localhost:5000/index.html'
    });
};

// או הכתובת או המתודה לא חוקיים
export const urlNotFound = (req, res, next) => {
    next({ status: 404, msg: `url: ${req.url} with method ${req.method} not found` });
};