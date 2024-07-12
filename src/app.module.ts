import { Module, RequestMethod, type MiddlewareConsumer } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
import { JwtModule } from '@nestjs/jwt';
import * as dotenv from 'dotenv';
import { JwtMiddleware } from './auth/jwt/jwt.middleware';
import { AuthController } from './auth/auth.controller';
import { UsersController } from './users/users.controller';
import { BooksController } from './books/books.controller';
import { AuthorsController } from './authors/authors.controller';

dotenv.config();
const MONGO_URI = process.env.MONGO_URI;
const JWT_TOKEN = process.env.JWT_TOKEN;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    JwtModule.register({
      secret: JWT_TOKEN,
      signOptions: { expiresIn: '7d' },
    }),
    AuthModule,
    UsersModule,
    BooksModule,
    AuthorsModule,
  ],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(JwtMiddleware)
      .exclude(
        { path: '/auth/login', method: RequestMethod.POST },
        { path: '/auth/register', method: RequestMethod.POST },
      )
      .forRoutes(
        AuthController,
        UsersController,
        BooksController,
        AuthorsController,
      );
  }
}
