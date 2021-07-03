import { Module } from '@nestjs/common';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { ClientProxyFactory, Transport } from '@nestjs/microservices';
import { PasswordService } from 'src/password/password.service';

@Module({
  imports: [
    JwtModule.registerAsync({
      imports: [ConfigModule],
      useFactory: async (configService: ConfigService) => {
        return {
          secret: configService.get<string>('JWT_SECRET'),
          signOptions: { expiresIn: '3600s' }, // 1h
        };
      },
      inject: [ConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    PasswordService,
    JwtStrategy,
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
export class AuthModule {}
