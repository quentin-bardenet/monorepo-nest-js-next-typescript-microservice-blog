import { Controller } from '@nestjs/common';
import { MessagePattern } from '@nestjs/microservices';
import { AppService } from './app.service';
import { UsersDto } from './new-users.dto';
import { Users } from './users.interface';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @MessagePattern({ cmd: 'createUser' })
  async createUser(usersDto: UsersDto): Promise<Users> {
    return await this.appService.create(usersDto);
  }

  @MessagePattern({ cmd: 'findUserBy' })
  async findUserBy(criteria: { email: string }): Promise<Users> {
    return await this.appService.findOneBy(criteria);
  }
}
