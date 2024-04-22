import mongoose from "mongoose";
const Schema = mongoose.Schema;

const PostSchema = new Schema({
  title: {
    type: String,
    minlength: 1,
    maxLength: 128,
  },
  content: {
    type: String,
  },
  user: {
    type: Schema.ObjectId,
  },
  posted: {
    type: Date,
    default: Date.now(),
  },
  edited: {
    type: Date,
    default: Date.now(),
  },
  published: {
    type: Boolean,
    default: false,
  },
});

PostSchema.virtual("url").get(function () {
  return `/blog/post/${this._id}`;
});

export default mongoose.model("post", PostSchema);
