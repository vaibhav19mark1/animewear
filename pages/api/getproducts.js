import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
    let allProducts = await Product.find();
    res.status(200).json({ allProducts });
};

export default connectDb(handler);
