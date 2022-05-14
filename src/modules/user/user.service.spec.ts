import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import mongoose, { Model } from 'mongoose';
import {
  User,
  UserDocument,
  UserSchema,
} from '../../../src/model/user/user.model';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { UModel } from './UModel';
import { UserController } from './user.controller';
import { UserModule } from './user.module';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';
describe('UserService', () => {
  let service: UserService;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UserController],
      providers: [UserService, ...usersProviders, ...databaseProviders],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
