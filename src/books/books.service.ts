import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/books.schema';
import type { Model } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async createBook(createBook: any): Promise<Book> {
    const createdBook = new this.bookModel(createBook);
    return createdBook.save();
  }

  async findAllBooks(): Promise<Book[]> {
    return this.bookModel.find();
  }

  async findOneBook(id: string): Promise<Book> {
    return this.bookModel.findById(id);
  }

  async updateBook(id: string, updateBook: any): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBook, { new: true });
  }

  async deleteBook(id: string): Promise<any> {
    return this.bookModel.findByIdAndDelete(id);
  }
}
