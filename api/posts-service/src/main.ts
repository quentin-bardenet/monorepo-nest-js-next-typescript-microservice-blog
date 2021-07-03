import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

const logger = new Logger();

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {});

  const configService = app.get<ConfigService>(ConfigService);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.NATS,
    options: {
      url: configService.get<string>('NATS_ENDPOINT'),
      queue: 'post_queue',
    },
  });

  await app.startAllMicroservices(() =>
    logger.log('Post service is listening'),
  );
}
bootstrap();
