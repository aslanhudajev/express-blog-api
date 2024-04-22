import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    maxLength: 512,
  },
  post: Schema.ObjectId,
});

export default mongoose.model("Comment", CommentSchema);
