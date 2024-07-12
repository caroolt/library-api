import { Injectable } from '@nestjs/common';
import { Author } from './schemas/author.schema';
import type { Model } from 'mongoose';
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

  async findAllAuthors(): Promise<Author[]> {
    return this.authorModel.find();
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
