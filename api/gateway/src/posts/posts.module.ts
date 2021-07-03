import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PostsController } from './posts.controller';
import { PostsService } from './posts.service';

@Module({
  controllers: [PostsController],
  providers: [
    PostsService,
    {
      provide: 'NATS_SERVICE',
      useFactory: (configService: ConfigService) => {
        return ClientProxyFactory.create({
          transport: Transport.NATS,
          options: {
            url: configService.get<string>('NATS_ENDPOINT'),
          },
        });
      },
      inject: [ConfigService],
    },
  ],
})
export class PostsModule {}
