import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ROLES_KEY } from './roles.decorator';
import type { JwtPayload } from 'src/auth/jwt/jwt-payload.interface';

@Injectable()
export class RolesGuard implements CanActivate {
  constructor(private reflector: Reflector) {}

  canActivate(context: ExecutionContext): boolean {
    const roles = this.reflector.get<string[]>(ROLES_KEY, context.getHandler());
    if (!roles || roles.includes('admin')) {
      const request = context.switchToHttp().getRequest();
      const user: JwtPayload = request.user;

      if (user && user.role === 'admin') {
        return true;
      }
    }
    return false;
  }
}
