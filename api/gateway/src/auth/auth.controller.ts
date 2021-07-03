import { Body, Post, UseFilters, UseGuards } from '@nestjs/common';
import { Res } from '@nestjs/common';
import { Controller } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Response, Request } from 'express';
import { AuthGuard } from '@nestjs/passport';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { Req } from '@nestjs/common';
import { Get } from '@nestjs/common';
import { AllExceptionsFilter } from 'src/filters/rpc-exception.filter';
import { HttpExceptionFilter } from 'src/filters/http-exception.filter';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  @UseFilters(new AllExceptionsFilter())
  @UseFilters(new HttpExceptionFilter())
  async login(
    @Body() user: any,
    @Res({ passthrough: true }) response: Response,
  ) {
    const { access_token } = await this.authService.login(user);
    response.cookie('userToken', access_token);
  }

  @Post('/register')
  async register(@Body() user: any) {
    return this.authService.register(user);
  }

  @Get('/profile')
  @UseGuards(AuthGuard('jwt'), JwtAuthGuard)
  async myProfile(
    @Req() request: Request,
    @Res({ passthrough: true }) response: Response,
  ) {
    //@ts-ignore
    const user = request.user;
    this.authService.refreshToken(user);

    const { access_token } = await this.authService.refreshToken(user);

    response.cookie('userToken', access_token).json(user);
  }
}
