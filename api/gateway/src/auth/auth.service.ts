import { HttpException } from '@nestjs/common';
import { Inject } from '@nestjs/common';
import { HttpStatus } from '@nestjs/common';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ClientProxy, RpcException } from '@nestjs/microservices';
import { PasswordService } from 'src/password/password.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject('NATS_SERVICE') private readonly natsService: ClientProxy,
    private readonly pwdService: PasswordService,
  ) {}

  decodeToken(token: string) {
    return this.jwtService.decode(token);
  }

  async login(user: any): Promise<any> {
    const response$ = this.natsService.send<any>({ cmd: 'findUserBy' }, user);

    return new Promise((resolve, reject) => {
      response$.subscribe(foundUser => {
        if (!foundUser) {
          reject(
            new RpcException({
              status: HttpStatus.NOT_FOUND,
              error: 'user_not_found',
              message: 'user_not_found',
            }),
          );
        } else {
          resolve(this.validatePassword(user, foundUser));
        }
      });
    });
  }

  async validatePassword(userToValidate, userFromDb) {
    if (
      !this.pwdService.validatePassword(
        userToValidate.password,
        userFromDb.password,
      )
    ) {
      throw new RpcException({
        status: HttpStatus.NOT_FOUND,
        error: 'user_not_found',
        message: 'user_not_found',
      });
    }

    const payload = {
      createdAt: new Date().toISOString(),
      email: userFromDb.email,
      _id: userFromDb._id,
      firstName: userFromDb.firstName,
      lastName: userFromDb.lastName,
    };

    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(user: any): Promise<any> {
    user.password = await this.pwdService.hashPassword(user.plainPassword);
    user.roles = ['ROLE_ADMIN'];
    return this.natsService.send<any>({ cmd: 'createUser' }, user);
  }

  async refreshToken(user: any) {
    return {
      access_token: this.jwtService.sign({
        ...user,
        createdAt: new Date().toISOString(),
      }),
    };
  }
}
