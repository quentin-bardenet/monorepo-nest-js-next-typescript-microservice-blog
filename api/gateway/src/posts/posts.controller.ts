import { Get, Param, Res, UseGuards } from '@nestjs/common';
import { Body, Controller, Post } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Roles } from 'src/decorators/roles.decorators';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { TokenAuthGuard } from 'src/guards/token-auth.guard';
import { PostsService } from './posts.service';

@Controller('posts')
export class PostsController {
  constructor(private readonly postService: PostsService) {}

  @Post('/')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  //@Roles('ROLE_ADMIN')
  async createPost(@Body() post: any) {
    return this.postService.create(post);
  }

  @Get('/')
  @UseGuards(TokenAuthGuard)
  async getPosts() {
    return this.postService.find();
  }

  @Get('/:id')
  @UseGuards(TokenAuthGuard)
  async getPostById(@Param('id') id: string) {
    return this.postService.findById(id);
  }
}
