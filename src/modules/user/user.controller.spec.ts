import { Inject } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { Test, TestingModule } from '@nestjs/testing';
import { Model } from 'mongoose';
import { User, UserDocument, UserSchema } from '../../../src/model/user/user.model';
import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule],
      controllers: [UserController],
      providers: [UserService, ...usersProviders,...databaseProviders],
  }).compile();
 
  userService = module.get<UserService>(UserService);
  controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
