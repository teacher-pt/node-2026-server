const db = [
    { id: 1, name: 'milk' },
    { id: 2, name: 'cake' },
    { id: 3, name: 'cheese' },
    { id: 4, name: 'bread' },
];

// GET - החזרת כל המוצרים
export const getAllProducts = (req, res, next) => {
    console.log(req.query); // פרמטר שלא חובה עם ?

    // res.send('Hello Products! sort by ' + req.query.sort);

    // json מקובל יותר להחזיר אוביקט ע"י
    res.json(db);
};

export const getProductById = (req, res, next) => {
    const product = db.find(p => p.id == req.params.id);

    if (!product) {
        // נקסט שמקבל אוביקט הולך תמיד למידלוואר של השגיאות
        next({ status: 404, msg: `product ${req.params.id} not found` });
    } else {
        res.json(product);
    }
};

// POST - הוספת מוצר
export const addProduct = (req, res, next) => {
    const { name } = req.body;

    if (!name || name.trim() === '') {
        // return עוצר את הפונקציה
        // ואז כל שאר הקוד יתבצע רק אם השם תקין
        // נקסט שמקבל אוביקט הולך תמיד למידלוואר של השגיאות
        return next({ msg: 'name must not be empty', status: 409 })
        //return res.status(409).json({ message: 'name must not be empty' });
    }

    // console.log(req.body);
    const newProduct = {
        id: Date.now(),
        name
    };

    db.push(newProduct);

    res.status(201).json(newProduct);
};

// PUT - עדכון מוצר
export const updateProduct = (req, res, next) => {
    const { id } = req.params; // הקוד לעדכון

    const product = db.find(p => p.id == id);
    product.name = req.body.name;

    res.json(product);
};

export const deleteProduct = (req, res, next) => {
    const { id } = req.params;

    const productIndex = db.findIndex(p => p.id == id);

    if (productIndex === -1) {
        return next({ msg: `product ${id} not found`, status: 404 })
    }

    db.splice(productIndex, 1); // מחיקת איבר אחד מאינדקס נתון

    res.status(204).end();
};