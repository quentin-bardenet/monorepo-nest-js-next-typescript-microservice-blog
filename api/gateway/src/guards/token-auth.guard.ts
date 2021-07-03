import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { Observable } from 'rxjs';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class TokenAuthGuard implements CanActivate {
  constructor(private readonly configService: ConfigService) {}
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const headers = context.switchToHttp().getRequest().headers;

    return !(
      !headers['x-token'] ||
      headers['x-token'] !== this.configService.get<string>('API_X_TOKEN')
    );
  }
}
