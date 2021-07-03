import { Inject } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';

@Injectable()
export class PostsService {
  constructor(
    @Inject('NATS_SERVICE') private readonly natsService: ClientProxy,
  ) {}

  async create(post: any): Promise<any> {
    return this.natsService.send<any>({ cmd: 'createPost' }, post);
  }

  async find(): Promise<any> {
    return this.natsService.send<any>({ cmd: 'findPosts' }, {});
  }

  async findById(id: string): Promise<any> {
    return this.natsService.send<any>({ cmd: 'findPostById' }, { id });
  }
}
