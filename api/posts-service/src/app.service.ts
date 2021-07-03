import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { PostsDto } from './new-post.dto';
import { Posts } from './posts.interface';

@Injectable()
export class AppService {
  constructor(
    @InjectModel('Posts') private readonly postsModel: Model<Posts>,
  ) {}

  async create(post: PostsDto): Promise<Posts> {
    post.createdAt = new Date();
    post.updatedAt = new Date();
    const createdPost = new this.postsModel(post);
    return await createdPost.save();
  }

  async findBy(criteria): Promise<Posts[]> {
    return this.postsModel.find(criteria, null, { sort: { createdAt: -1 } });
  }

  async findById(id: string): Promise<Posts> {
    return this.postsModel.findById(id);
  }
}
