import { Router } from "express";
import { addProduct, deleteProduct, getAllProducts, getProductById, updateProduct } from "../controllers/product.controller.js";

// יצירת נתב עבור כל הניתובים שקשורים למוצרים
const router = Router();

// GET - החזרת כל המוצרים
router.get('/', getAllProducts);

router.get('/:id', getProductById);

// POST - הוספת מוצר
router.post('/', addProduct);

// PUT - עדכון מוצר
router.put('/:id', updateProduct);

router.delete('/:id', deleteProduct);

// ייצוא של הראוטר עם כל הניתובים
// רק משהו אחד ניתן לייצא כדיפולט
// ואז ניתן לקרוא לו בכל שם בעת הייבוא
export default router;