const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const connectDb = (handler) => async (req,res) => {
    if(mongoose.connections[0].readyState){
        console.log("connected again");
        return handler(res,req)
    }
    await mongoose.connect(process.env.MONGO_URI)
    console.log("connected");
    return handler(req,res)
};

export default connectDb;
