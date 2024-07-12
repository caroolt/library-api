import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { BooksModule } from './books/books.module';
import { AuthorsModule } from './authors/authors.module';
// eslint-disable-next-line @typescript-eslint/no-var-requires
require('dotenv').config();
const MONGO_URI = process.env.MONGO_URI;

@Module({
  imports: [
    MongooseModule.forRoot(MONGO_URI),
    AuthModule,
    UsersModule,
    BooksModule,
    AuthorsModule,
  ],
})
export class AppModule {}
