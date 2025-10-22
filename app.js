// const express = require('express');
import express from 'express';

const app = express();

// מיד אחרי יצירת השרת
// בשביל להוסיף יכולת של קבלת באדי
// body - POST/PUT/PATCH
app.use(express.json()); // JSON כדי לקבל אוביקט
app.use(express.urlencoded({ extended: true })); // כדי לקבל קבצים

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/products', (req, res) => {
    console.log(req.query); // פרמטר שלא חובה עם ?
    
    res.send('Hello Products! sort by ' + req.query.sort);
});

app.post('/products', (req, res) => {
    console.log(req.body);
    
    res.send('product added!');
});

app.put('/products/:id', (req, res) => {
    console.log(req.body);
    console.log(req.params);
    // const id = req.params.id;
    const { id } = req.params;

    res.send(`product ${id} updated!`);
});

app.delete('/products/:id', (req, res) => {
    const { id } = req.params;

    res.send(`product ${id} deleted!`);
});

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