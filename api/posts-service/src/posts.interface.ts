import { Document } from 'mongoose';

interface PostsModel {
  title: string;
  content: string;
  createdAt: Date;
  updatedAt: Date;
  imgUrl: string;
}

export interface Posts extends PostsModel, Document {}
