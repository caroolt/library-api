import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const token = req.headers.authorization?.replace('Bearer ', '');
    if (token) {
      try {
        const user = await this.jwtService.verify(token);
        req.user = user;
      } catch (error) {
        res.status(401).json({ message: error });
      }
    } else {
      res.status(401).json({ message: 'Token not found!' });
    }
    next();
  }
}
