// const express = require('express');
import express from 'express';
import { config } from "dotenv";
import morgan from 'morgan';
import cors from 'cors';

import productRouter from './routes/product.router.js';
import userRouter from './routes/user.router.js';

import { printHello } from './middlewares/simple.middleware.js';
import { errorHandler, urlNotFound } from './middlewares/errors.middleware.js';
import { blockHours } from './middlewares/blockServer.middleware.js';
import { connectDB } from './config/db.js';

// פונקציה שמביאה מידע מהקובץ הסודי
// .env
config();

// התחברות למונגו
connectDB();

// יצירת שרת
const app = express();

//const mdl = blockHours(14, 15);
//app.use(mdl);
//app.use(blockHours(0, 6));

// CORS - cross orign resource sharing
// שיתוף מידע בין אתרים שונים
//app.use(cors()); // גישה מכל קליינט
app.use(cors({ origin: 'http://127.0.0.1:5500' })); // גישה מקליינט מסויים

app.use(printHello);

// הדפסה לקונסול - לוגר
app.use(morgan('dev'));

// מיד אחרי יצירת השרת
// בשביל להוסיף יכולת של קבלת באדי
// body - POST/PUT/PATCH
// app.use - הוספת הגדרות על כל מי שמתחיל בכתובת מסוימת
app.use(express.json()); // JSON כדי לקבל אוביקט
app.use(express.urlencoded({ extended: true })); // כדי לקבל קבצים

// static - הופך תיקיה עם קבצים לתיקיה ציבורית שיוכלו לגשת אליה דרך השרת
app.use('/images', express.static('public'));
app.use(express.static('client'));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// כשהכתובת
// http://localhost:3000/products- מתחילה ב
// productRouter מיד הולך ל
// ומחפש את המשך הכתובת
app.use('/products', productRouter);
app.use('/users', userRouter);

app.use(urlNotFound);

// השגיאות של כל השרת ילכו למידלוואר של השגיאות
app.use(errorHandler);

// ?? ערך דיפולטיבי
const port = process.env.PORT ?? 3000;
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
});

// http://localhost:3000
// http://localhost:3000/products       GET
// http://localhost:3000/products/111   GET
// http://localhost:3000/products       POST
// http://localhost:3000/products/1     PUT   - עדכון מלא
// http://localhost:3000/products/1/name PATCH - עדכון חלקי
// http://localhost:3000/products/1     DELETE