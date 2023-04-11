import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Res,
} from '@nestjs/common';

import { BooksService } from './books.service';
import { Book } from './books.schema';

@Controller('books')
export class BooksController {
  constructor(private booksService: BooksService) {}

  @Get()
  async getAllBooks(@Res() response) {
    const books = await this.booksService.getBooks();

    return response.status(HttpStatus.OK).json({
      books,
    });
  }

  @Get('/:bookID')
  async getBook(@Res() response, @Param('bookID') bookID) {
    const book = await this.booksService.getBook(bookID);

    return response.status(HttpStatus.OK).json({
      book,
    });
  }

  @Post()
  async addBook(@Res() response, @Body() book: Book) {
    const createBook = await this.booksService.addBook(book);

    return response.status(HttpStatus.CREATED).json({
      createBook,
    });
  }

  @Put('/:bookID')
  async update(@Res() response, @Param('bookID') bookID, @Body() book: Book) {
    const updatedBook = await this.booksService.updateBook(bookID, book);

    return response.status(HttpStatus.OK).json({
      updatedBook,
    });
  }

  @Delete('/:BookID')
  async delete(@Res() response, @Param('BookID') BookID) {
    const deletedBook = await this.booksService.deleteBook(BookID);

    return response.status(HttpStatus.OK).json({
      deletedBook,
    });
  }
}
