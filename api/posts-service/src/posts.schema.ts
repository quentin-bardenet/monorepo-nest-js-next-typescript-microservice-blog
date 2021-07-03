import * as mongoose from 'mongoose';

export const PostsSchema = new mongoose.Schema({
  title: String,
  content: String,
  createdAt: Date,
  updatedAt: Date,
  imgUrl: String,
});
