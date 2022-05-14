import { Test  } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { UserController } from './user.controller';
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
