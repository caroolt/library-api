import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from '../../auth.service';
import { JwtPayload } from '../jwt-payload.interface';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const JWT_TOKEN = process.env.JWT_TOKEN;
@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: JWT_TOKEN,
    });
  }

  async validate(payload: JwtPayload) {
    const user = await this.authService.validateUser(
      payload.email,
      payload.sub,
    );
    if (!user) {
      throw new Error('Unauthorized');
    }
    return user;
  }
}
