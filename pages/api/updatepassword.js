import connectDb from "@/middleware/mongoose";
import User from "@/models/User";
import jsonwebtoken from "jsonwebtoken";
const CryptoJS = require("crypto-js");

const handler = async (req, res) => {
  if (req.method == "POST") {
    await connectDb()
    let token = req.body.token;
    let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
    let dbuser=await User.findOne({email: user.email})
    const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.SECRET_KEY);
    let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
    if(decryptedPassword==req.body.currpassword && req.body.password == req.body.cpassword){
      await User.findOneAndUpdate({ email: user.email }, { password: CryptoJS.AES.encrypt(req.body.password, process.env.SECRET_KEY).toString() });
      res.status(200).json({ success: true });
    }
    else{
      res.status(400).json({success: false})
    }
  } else {
    res.status(400).json({ error: "error" });
  }
};

export default handler;
