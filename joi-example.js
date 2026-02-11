import { object, string, ref, number } from 'joi';
// import Joi from 'joi' // שגיאה

// אוביקט עם הגדרות הוולידציה
const mySchema = object({
    username: string() // טיפוס
        .alphanum() // אותיות/מספרים
        .min(3) // אורך מינימלי
        .max(30) // אורך מקסימלי
        .required(), // חובה

    password: string()
        .pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')), // ביטוי רגולרי, תבנית

    repeat_password: ref('password'), // קישור לתכונה אחרת, ערך זהה

    access_token: [ // או מחרוזת או מספר
        string(),
        number()
    ],

    birth_year: number()
        .integer() // מספר שלם
        .min(1900) // ערך מינימלי
        .max(2013), // ערך מקסימלי

    email: string()
        .email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } })
})
    .with('username', 'birth_year')
    .xor('password', 'access_token')
    .with('password', 'repeat_password');

// 1. בצורה סינכרונית - validate
mySchema.validate({ username: 'abc', birth_year: 1994 });
// -> { value: { username: 'abc', birth_year: 1994 } }

mySchema.validate({});
// -> { value: {}, error: '"username" is required' }

// 2. validateAsync
try {
    // אפשר לבדוק דברים בשרת מרוחק
    const value = await mySchema.validateAsync({ username: 'abc', birth_year: 1994 });
}
catch (err) { }
