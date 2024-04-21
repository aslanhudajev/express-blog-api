import mongoose from "mongoose";
const Schema = mongoose.Schema;

const CommentSchema = new Schema({
  content: {
    type: String,
    maxLength: 512,
  },
  user: Schema.ObjectId,
});

export default mongoose.model("Comment", CommentSchema);
