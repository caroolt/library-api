import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { JwtPayload } from './jwt/jwt-payload.interface';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.usersService.findOneByEmail(email);
    if (user && bcrypt.compareSync(password, user.password)) {
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
      const { password, ...result } = user;
      return result;
    }
    return null;
  }

  async login(user: any) {
    const userFound = await this.usersService.findOneByEmail(user.email);
    if (!userFound) {
      return 'User not found';
    }

    const payload: JwtPayload = {
      email: user.email,
      sub: userFound._id.toString(),
      role: userFound.role,
    };
    return {
      access_token: this.jwtService.sign(payload, { expiresIn: '7d' }),
    };
  }

  async register(createUser: any) {
    const hashedPassword = bcrypt.hashSync(createUser.password, 10);
    const user = await this.usersService.createUser({
      ...createUser,
      password: hashedPassword,
    });
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    const { password, ...result } = user;
    return result;
  }

  async refreshToken(token: string) {
    try {
      const payload = this.jwtService.verify(token);
      const user = await this.usersService.findOneByEmail(payload.email);
      if (user) {
        return this.login(user);
      }
    } catch (e) {
      return null;
    }
  }
}
