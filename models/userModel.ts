import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    require: true,
  },
  email: {
    type: String,
    require: true,
  },
  password: {
    type: String,
    select: false,
  },
  googleId: {
    type: String,
  },
});

export const User = mongoose.models?.User || mongoose.model("User", userSchema);
