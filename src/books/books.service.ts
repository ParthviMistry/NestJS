import { Injectable, HttpException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Book, BookDocument } from './books.schema';

@Injectable()
export class BooksService {
  constructor(@InjectModel(Book.name) private bookModel: Model<BookDocument>) {}

  async getBooks(): Promise<Book[]> {
    return await this.bookModel.find().exec();
  }

  async getBook(bookID: Number): Promise<Book> {
    const book = await this.bookModel.findById(bookID).exec();

    if (!book) throw new HttpException('Book does not exist!', 404);

    return book;
  }

  async addBook(book: Book): Promise<Book> {
    const createBook = new this.bookModel(book);

    return createBook.save();
  }

  async updateBook(id: any, book: Book): Promise<Book> {
    return await this.bookModel.findByIdAndUpdate(id, book, { new: true });
  }

  async deleteBook(bookID: Number): Promise<Book> {
    return await this.bookModel.findByIdAndRemove(bookID);
  }
}
