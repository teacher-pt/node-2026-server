import { isValidObjectId } from "mongoose";
import Product from "../models/product.model.js";

// GET - החזרת כל המוצרים
// http://localhost:5000/products?name=a&sortBy=productDate&page=4&limit=3
export const getAllProducts = async (req, res, next) => {
    try {
        // console.log(req.query); // פרמטר שלא חובה עם ?
        // בגלל שהתייחסנו לערך של משתנה בנינו את הביטוי הרגולרי בצורה דינאמית-ניו
        const list = await Product.find({ name: new RegExp(req.query.name, 'i') }) // כל המוצרים שמכילים את השם ששלחנו
            .sort({ [req.query.sortBy]: 1}) // ממיין לפי השדה שהוא הערך של המשתנה req.query.sortBy
        // .sort( { name: 1 } ) // מיון לפי שם בסדר עולה
        // .sort( { name: -1 } )// מיון לפי שם בסדר יורד

        

        // מכיל את האות  m/M
        //                                  WHERE                      SELECT
        // const list = await Product.find({ name: /m/i }, { name: true, "company.name": true, _id: false }); // SELECT name, company.name FROM products WHERE name LIKE '%m%'

        // res.send('Hello Products! sort by ' + req.query.sort);

        // json מקובל יותר להחזיר אוביקט ע"י
        res.json(list);
    } catch (error) {
        next(error);
    }
};

export const getProductById = async (req, res, next) => {
    try {
        // כאשר ניגשים לחפש לפי איי-די
        // חובה לבדוק קודם שהוא תקין
        if (!isValidObjectId(req.params.id)) {
            return next({ status: 404, msg: `product ${req.params.id} not found` });
        }

        // SELECT name FROM products WHERE _id = req.params.id
        //                                          WHERE                  SELECT
        // const oneP = await Product.findOne({ _id: req.params.id, ... }, { name: true, _id: 0 });
        const oneP = await Product.findById(req.params.id);

        if (!oneP) { // מחזיר נאל אם לא מצא
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

        if (!isValidObjectId(id)) {
            return next({ status: 404, msg: `product ${req.params.id} not found` });
        }

        const p = await Product.findByIdAndUpdate(id, {
            // הוספה/עדכון של שדות באוביקט
            $set: req.body,
            // $set: { name: req.body.name, isSale: true, company: { name: 'rami levi', address: 'jerusalem' } },

            // מחיקת שדות
            $unset: { price: true },
        },
            {
                new: true, // כדי שיחזור האוביקט לאחר העדכון

                // TODO: check why string company is valid...
                runValidators: true, // כדי להריץ את בדיקות התקינות והטיפוסים בעת עדכון
            });

        res.json(p);
    } catch (error) {
        next(error);
    }
};

export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        if (!isValidObjectId(id)) {
            return next({ status: 404, msg: `product ${req.params.id} not found` });
        }

        const p = await Product.findByIdAndDelete(id);
        //Product.findOneAndDelete({ _id: id })

        if (!p) {
            return next({ msg: `product for delete ${id} not found`, status: 404 });
        }

        res.status(204).end(); // נמחק בהצלחה
    } catch (error) {
        next(error);
    }
};