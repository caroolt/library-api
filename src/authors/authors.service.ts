import { Injectable } from '@nestjs/common';
import { Author } from './schemas/author.schema';
import type { Model, SortOrder } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
@Injectable()
export class AuthorsService {
  constructor(
    @InjectModel(Author.name)
    private authorModel: Model<Author>,
  ) {}

  async createAuthor(createAuthor: any): Promise<Author> {
    const Author = new this.authorModel(createAuthor);
    return Author.save();
  }

  async findAllAuthors(
    page?: number,
    limit?: number,
    sortBy?: string,
    sortDir?: 'asc' | 'desc',
  ): Promise<Author[]> {
    const skip = (page - 1) * limit;

    const sortOptions: { [key: string]: SortOrder } = {};
    sortOptions[sortBy] = sortDir === 'asc' ? 1 : -1;

    return this.authorModel.find().sort(sortOptions).skip(skip).limit(limit);
  }

  async findOneAuthor(id: string): Promise<Author> {
    return this.authorModel.findById(id);
  }

  async updateAuthor(id: string, updateAuthor: any): Promise<Author> {
    return this.authorModel.findByIdAndUpdate(id, updateAuthor, { new: true });
  }

  async deleteAuthor(id: string): Promise<any> {
    return this.authorModel.findByIdAndDelete(id);
  }
}
