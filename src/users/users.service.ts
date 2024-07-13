import { BadRequestException, Injectable } from '@nestjs/common';
import type { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';
import { User } from './schemas/user.schema';
@Injectable()
export class UsersService {
  constructor(
    @InjectModel(User.name)
    private readonly userModel: Model<User>,
  ) {}

  async createUser(createUser: any): Promise<User> {
    const existingUser = await this.findOneByEmail(createUser.email);

    if (existingUser) {
      throw new BadRequestException('This email is already registered');
    }

    const user = new this.userModel(createUser);
    return user.save();
  }

  async findAllUsers(): Promise<User[]> {
    return this.userModel.find();
  }

  async findOneUser(id: string): Promise<User> {
    return this.userModel.findById(id);
  }

  async findOneByEmail(email: string): Promise<User> {
    return this.userModel.findOne({ email });
  }

  async updateUser(id: string, updateUser: any): Promise<User> {
    return this.userModel.findByIdAndUpdate(id, updateUser, { new: true });
  }

  async deleteUser(id: string): Promise<any> {
    return this.userModel.findByIdAndDelete(id);
  }
}
