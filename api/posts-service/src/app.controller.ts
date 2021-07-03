import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { PostsDto } from './new-post.dto';
import { Posts } from './posts.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'createPost' })
  async createPost(postDto: PostsDto): Promise<Posts> {
    return await this.appService.create(postDto);
  }

  @MessagePattern({ cmd: 'findPosts' })
  async findPosts(criteria): Promise<Posts[]> {
    return await this.appService.findBy(criteria);
  }

  @MessagePattern({ cmd: 'findPostById' })
  async findPostById(payload): Promise<Posts> {
    return await this.appService.findById(payload.id);
  }
}
