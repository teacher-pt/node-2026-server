// const express = require('express');
import express from 'express';
import productRouter from './routes/product.router.js';

const app = express();

// מיד אחרי יצירת השרת
// בשביל להוסיף יכולת של קבלת באדי
// body - POST/PUT/PATCH
// app.use - הוספת הגדרות על כל מי שמתחיל בכתובת מסוימת
app.use(express.json()); // JSON כדי לקבל אוביקט
app.use(express.urlencoded({ extended: true })); // כדי לקבל קבצים

app.get('/', (req, res) => {
    res.send('Hello World!');
});

// כשהכתובת
// http://localhost:3000/products- מתחילה ב
// productRouter מיד הולך ל
// ומחפש את המשך הכתובת
app.use('/products', productRouter);

const port = 3000;
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