// פונקצית מידלוואר מקבלת 3 פרמטרים
// req  - בקשה
// res  - תגובה
// next - פונקציה שיכולה להמשיך הלאה

export const printHello = (req111, res11, next1111) => {
    console.log('hello');
    
    // כמה אפשרויות לצאת ממידלוואר
    // 1. החזרת תגובה
    //res.status(500).json({ error: 'you cannot go to server' });

    // 2. להמשיך למידלוואר הבא
    // העברת פרמטרים לא ע"י שליחה בסגוריים
    // ע"י הוספת שדות לבקשה/לתגובה
    res11.xxx = 123;
    req111.xxx = 123;
    next1111();
};

// מידלוואר שחוסם גישה לאתר משעה 4 עד 5 בצהרים
const blockHours45 = (req, res, next) => {

};