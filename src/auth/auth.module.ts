import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy/jwt.strategy';
import { LocalStrategy } from './local/local.strategy/local.strategy';
import { JwtGuard } from './jwt/jwt.guard';
import { LocalAuthGuard } from './local/local-auth/local-auth.guard';

// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();

const JWT_TOKEN = process.env.JWT_TOKEN;
@Module({
  imports: [
    UsersModule,
    PassportModule,
    JwtModule.register({
      secret: JWT_TOKEN,
      signOptions: { expiresIn: '7d' },
    }),
  ],
  providers: [
    AuthService,
    JwtStrategy,
    LocalStrategy,
    JwtGuard,
    LocalAuthGuard,
  ],
  controllers: [AuthController],
})
export class AuthModule {}
