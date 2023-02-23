import mongoose from "mongoose";

mongoose.set("strictQuery", true);

const connectDb = async () => {
  if (!mongoose.connections[0].readyState) {
    await mongoose.connect(process.env.MONGO_URI);
  }
};

export default connectDb;
