import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ConfigModule } from '@nestjs/config';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { BooksController } from './books/books.controller';
import { Book, BookSchema } from './books/books.schema';
import { BooksService } from './books/books.service';

import { SignupService } from './login/signup.service';
import { SignupController } from './login/signup.controller';
import { Signup, SignupSchema } from './login/signup.schema';

import * as dotenv from 'dotenv';
dotenv.config();

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    MongooseModule.forRoot(process.env.MONGODB_URL),
    MongooseModule.forFeature([{ name: Book.name, schema: BookSchema },{ name: Signup.name, schema: SignupSchema }]),
  ],
  controllers: [AppController, BooksController, SignupController],
  providers: [AppService, BooksService, SignupService],
})
export class AppModule {}
