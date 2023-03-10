import connectDb from "@/middleware/mongoose";
import Order from "@/models/Order";
import jsonwebtoken from "jsonwebtoken";

const handler = async (req, res) => {
  await connectDb();
  const token = req.body.token;
  var data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders });
};

export default handler;
