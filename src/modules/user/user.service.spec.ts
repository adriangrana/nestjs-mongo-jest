import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserSchema } from '../../../src/model/user/user.model';
import { UserController } from './user.controller';
import { UserService } from './user.service';

describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    service = new UserService(new Model(User.name, UserSchema));
  /*   const module: TestingModule = await Test.createTestingModule({
      providers: [UserService],
    }).compile();
 */
 //   service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
