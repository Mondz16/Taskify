import mongoose from "mongoose";

const connectedDb = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log("Connected to the Database!");
  } catch (error) {
    console.log("Failed to connect to Database!", error);
  }
};

export { connectedDb };
