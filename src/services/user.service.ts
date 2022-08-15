import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User, UserDocument } from 'src/schemas/user.schema';
import { UserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(@InjectModel('User') private UserModel: Model<UserDocument>) {}

  async findAll(): Promise<User[]> {
    return await this.UserModel.find({});
  }

  async findByEmail(email: string): Promise<User> {
    return await this.UserModel.findOne({
      email: email,
    });
  }

  async findById(id: string): Promise<User> {
    return await this.UserModel.findOne({
      _id: id,
    });
  }

  async addUser(user: UserDto): Promise<User | string> {
    const email = user.email;
    const findUser = await this.UserModel.findOne({ email });
    if (findUser) return 'User with this email already exist';

    const createdUser = new this.UserModel(user);
    return await createdUser.save();
  }

  async update(id: string, user: Partial<UserDto>): Promise<User> {
    return await this.UserModel.findOneAndUpdate({ _id: id }, user, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return await this.UserModel.deleteOne({
      _id: id,
    });
  }
}
