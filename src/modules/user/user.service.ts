import { Inject, Injectable } from '@nestjs/common';
import { Model } from 'mongoose';
import { User } from '../../models/user/user.model';
import { CreateUserDto } from './dto/create-user.dto';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_MODEL')
    private userModel: Model<User>,
  ) {}

  create(user: CreateUserDto): Promise<any> {
    const IModel = new this.userModel(user);
    const hasError = IModel.validateSync();
    if (hasError) {
      throw new Error(hasError.message);
    }
    return IModel.save();
  }

  findAll() {
    return this.userModel.find().exec();
  }

  /*  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  } */
}
