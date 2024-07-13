import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Book } from './schemas/books.schema';
import type { Model, SortOrder } from 'mongoose';

@Injectable()
export class BooksService {
  constructor(
    @InjectModel(Book.name)
    private bookModel: Model<Book>,
  ) {}

  async createBook(createBook: any): Promise<Book> {
    const existingBook = await this.findBookByTitle(createBook.title);

    if (existingBook) {
      throw new BadRequestException('Book already exists');
    }

    const createdBook = new this.bookModel(createBook);
    return createdBook.save();
  }

  async findAllBooks(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): Promise<Book[]> {
    const skip = (page - 1) * limit;
    const sortOptions: { [key: string]: SortOrder } = {};
    sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;

    return this.bookModel
      .find()
      .populate('author')
      .sort(sortOptions)
      .skip(skip)
      .limit(limit);
  }

  async findOneBook(id: string): Promise<Book> {
    return this.bookModel.findById(id).populate('author');
  }
  async findBookByTitle(title: string): Promise<Book> {
    return this.bookModel.findOne({ title }).populate('author');
  }

  async updateBook(id: string, updateBook: any): Promise<Book> {
    return this.bookModel.findByIdAndUpdate(id, updateBook, { new: true });
  }

  async deleteBook(id: string): Promise<any> {
    return this.bookModel.findByIdAndDelete(id);
  }
}
