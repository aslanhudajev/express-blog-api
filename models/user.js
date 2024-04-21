import mongoose from "mongoose";
const Schema = mongoose.Schema;

const UserSchema = new Schema({
  username: {
    type: String,
    minlength: 1,
    maxLength: 64,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    maxLength: 256,
    required: true,
  },
  email: {
    type: String,
    lowercase: true,
    trim: true,
    maxLength: 256,
    required: true,
  },
});

UserSchema.virtual("url").get(function () {
  return `/profile/${this._id}`;
});

export default mongoose.model("User", UserSchema);
