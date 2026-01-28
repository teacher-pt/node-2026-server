import Product from "../models/product.model.js";

const db = [
    { id: 1, name: 'milk' },
    { id: 2, name: 'cake' },
    { id: 3, name: 'cheese' },
    { id: 4, name: 'bread' },
];

// GET - החזרת כל המוצרים
export const getAllProducts = async (req, res, next) => {
    try {
        const list = await Product.find(); // SELECT * FROM products
        //console.log(req.query); // פרמטר שלא חובה עם ?

        // res.send('Hello Products! sort by ' + req.query.sort);

        // json מקובל יותר להחזיר אוביקט ע"י
        res.json(list);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        // SELECT name FROM products WHERE _id = req.params.id
        //                                          WHERE                  SELECT
        const oneP = await Product.findOne({ _id: req.params.id }, { name: true, _id: 0 });

        if (!oneP) {
            // נקסט שמקבל אוביקט הולך תמיד למידלוואר של השגיאות
            return next({ status: 404, msg: `product ${req.params.id} not found` });
        }

        // json מקובל יותר להחזיר אוביקט ע"י
        res.json(oneP);
    } catch (error) {
        next(error);
    }
};

// POST - הוספת מוצר
export const addProduct = async (req, res, next) => {
    try {
        //req.body מוצר להוספה ללא איי-די
        // 1. יצירת אוביקט לוקאלי
        const newP = new Product(req.body);
        /*
        const newP = new Product({
            name: 'abc', // תכונה שקיימת במודל מסוג נכון - שם כרגיל
            price: "50", // תכונה קיימת מסוג מספר ולא מחרוזת - מנסה להמיר
            x: 100, // תכונה שלא קיימת במודל - לא שם
        });
        */

        // 2. הוספה לדטהבייס עם שמירה
        await newP.save();

        res.status(201).json(newP);
    } catch (error) {
        next(error);
    }
};

// PUT - עדכון מוצר
export const updateProduct = async (req, res, next) => {
    try {
        const { id } = req.params; // הקוד לעדכון

       const p = await Product.findByIdAndUpdate(id, {
            $set: { name: req.body.name, isSale: true } // הוספה/עדכון של שדות באוביקט,
        }, { new: true });

        res.json(p);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        const p = await Product.findByIdAndDelete(id)
        //Product.findOneAndDelete({ _id: id })

        if (!p) {
            return next({ msg: `product for delete ${id} not found`, status: 404 });
        }

        res.status(204).end(); // נמחק בהצלחה
    } catch (error) {
        next(error);
    }
};