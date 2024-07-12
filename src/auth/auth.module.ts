import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { AuthService } from './auth.service';
import { UsersModule } from '../users/users.module';
import { AuthController } from './auth.controller';
import { JwtStrategy } from './jwt/jwt.strategy/jwt.strategy';
import { LocalStrategy } from './local/local.strategy/local.strategy';
import { LocalAuthGuard } from './local/local-auth/local-auth.guard';
import * as dotenv from 'dotenv';

dotenv.config();
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
  providers: [AuthService, JwtStrategy, LocalStrategy, LocalAuthGuard],
  controllers: [AuthController],
})
export class AuthModule {}
