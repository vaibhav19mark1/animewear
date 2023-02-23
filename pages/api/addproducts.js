import connectDb from "@/middleware/mongoose";
import Product from "@/models/Product";

const handler = async (req, res) => {
  if (req.method == "POST") {
    await connectDb();
    for (let i = 0; i < req.body.length; i++) {
      let p = new Product({
        title: req.body[i].title,
        slug: req.body[i].slug,
        description: req.body[i].description,
        imageUrl: req.body[i].imageUrl,
        category: req.body[i].category,
        size: req.body[i].size,
        color: req.body[i].color,
        price: req.body[i].price,
        availableQty: req.body[i].availableQty,
      });
      await p.save();
    }
    res.status(200).json({ success: "Success! Item(s) added successfully" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default handler;
