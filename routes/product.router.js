import { Router } from "express";

// יצירת נתב עבור כל הניתובים שקשורים למוצרים
const router = Router();

// DRY - Don't Repeat Yourselt
// WET - Write Everything Twice

const db = [
    { id: 1, name: 'milk' },
    { id: 2, name: 'cake' },
    { id: 3, name: 'cheese' },
    { id: 4, name: 'bread' },
];

// GET - החזרת כל המוצרים
router.get('/', (req, res) => {
    console.log(req.query); // פרמטר שלא חובה עם ?

    // res.send('Hello Products! sort by ' + req.query.sort);

    // json מקובל יותר להחזיר אוביקט ע"י
    res.json(db);
});

router.get('/:id', (req, res) => {
    const product = db.find(p => p.id == req.params.id);

    if (!product) {
        res.status(404).json({ message: `product ${req.params.id} not found` });
    } else {
        res.json(product);
    }
});

// POST - הוספת מוצר
router.post('/', (req, res) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        // return עוצר את הפונקציה
        // ואז כל שאר הקוד יתבצע רק אם השם תקין
        return res.status(409).json({ message: 'name must not be empty' });
    }

    // console.log(req.body);
    const newProduct = {
        id: Date.now(),
        name
    };

    db.push(newProduct);

    res.status(201).json(newProduct);
});

// PUT - עדכון מוצר
router.put('/:id', (req, res) => {
    const { id } = req.params; // הקוד לעדכון

    const product = db.find(p => p.id == id);
    product.name = req.body.name;

    res.json(product);
});

router.delete('/:id', (req, res) => {
    const { id } = req.params;

    const productIndex = db.findIndex(p => p.id == id);

    if (productIndex === -1) {
        return res.status(404).json({ message: `product ${id} not found` });
    }

    db.splice(productIndex, 1); // מחיקת איבר אחד מאינדקס נתון

    res.status(204).end();
});

// ייצוא של הראוטר עם כל הניתובים
// רק משהו אחד ניתן לייצא כדיפולט
// ואז ניתן לקרוא לו בכל שם בעת הייבוא
export default router;