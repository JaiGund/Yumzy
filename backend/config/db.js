import mongoose from "mongoose";

export const connectDB = async () => {
  await mongoose
    .connect(
      'mongodb+srv://jailaxmangund:58555855@cluster0.63ptp.mongodb.net/yumzy'
    )
    .then(() => console.log("DB Connected"));
};
