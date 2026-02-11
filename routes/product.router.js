import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";
import { printHello } from '../middlewares/simple.middleware.js';
import { joiValidator } from "../middlewares/validator.middleware.js";
import { productValidation } from "../models/product.model.js";


// יצירת נתב עבור כל הניתובים שקשורים למוצרים
const router = Router();

// GET - החזרת כל המוצרים
router.get('/', printHello, getAllProducts);

router.get('/:id', getProductById);

// POST - הוספת מוצר
router.post('/', joiValidator(productValidation), addProduct);

// PUT - עדכון מוצר
router.put('/:id', joiValidator(productValidation), updateProduct);

router.delete('/:id', deleteProduct);

// ייצוא של הראוטר עם כל הניתובים
// רק משהו אחד ניתן לייצא כדיפולט
// ואז ניתן לקרוא לו בכל שם בעת הייבוא
export default router;