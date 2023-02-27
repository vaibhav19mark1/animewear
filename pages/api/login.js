import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
const CryptoJS = require("crypto-js");
const jwt = require("jsonwebtoken");

const handler = async (req, res) => {
  if (req.method == "POST") {
    await connectDb();
    let user = await User.findOne({ email: req.body.email });
    const bytes = CryptoJS.AES.decrypt(user.password, process.env.SECRET_KEY);
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    if (user) {
      if (req.body.email == user.email && req.body.password == decryptedPassword) {
        // JWT signing
        const token = jwt.sign({ email: user.email, name: user.name }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.status(200).json({ success: true, token, email: user.email });
      } else {
        res.status(401).json({ success: false, error: "Invalid credentials" });
      }
    } else {
      res.status(404).json({ success: false, error: "Invalid credentials" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
};

export default handler;