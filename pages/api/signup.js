import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    await connectDb();
    const { name, email } = req.body;
    let user = new User({
      name,
      email,
      password: CryptoJS.AES.encrypt(
        req.body.password,
        process.env.SECRET_KEY
      ).toString(),
    });
    await user.save();
    res.status(200).json({ success: "Success" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default handler;
