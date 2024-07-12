import { Controller, Request, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { ApiTags, ApiBearerAuth, ApiBody, ApiOperation } from '@nestjs/swagger';

@ApiTags('auth')
@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  @ApiOperation({ summary: 'User login' })
  @ApiBody({
    schema: { example: { email: 'user@example.com', password: 'password' } },
  })
  async login(@Request() { body }) {
    return this.authService.login(body);
  }

  @Post('register')
  @ApiOperation({ summary: 'Register a new user' })
  @ApiBody({
    schema: {
      required: ['name', 'email', 'password'],
      properties: {
        name: { type: 'string' },
        email: { type: 'string' },
        password: { type: 'string' },
        role: { type: 'string', enum: ['user', 'admin'], default: 'user' },
      },
      example: {
        name: 'John Doe',
        email: 'john@example.com',
        password: 'password',
        role: 'user',
      },
    },
  })
  async register(@Body() createUser) {
    return this.authService.register(createUser);
  }

  @Post('refresh-token')
  @ApiBearerAuth()
  @ApiOperation({ summary: 'Refresh access token' })
  async refreshToken(@Body() body) {
    return this.authService.refreshToken(body.refresh_token);
  }
}
