import { model, Schema } from "mongoose";

const productSchema = new Schema({
    // _id נוצר אוטומטית אם לא כתבנו,
    name: String,
    price: Number,
    amount: Number,
    isSale: Boolean,
    productDate: Date,
    categories: [String],
    company: {
        name: String,
        address: String
    }
});

// כך יצרנו אוסף/טבלה עבור מוצרים
const Product = model('products', productSchema);

export default Product;