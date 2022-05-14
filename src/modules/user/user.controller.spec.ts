import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';
import { DatabaseModule } from '../../lib/mongodb/database.module';
import { databaseProviders } from '../../lib/mongodb/database.providers';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';

describe('UserController', () => {
  let controller: UserController;
  let userService: UserService;
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule.forRoot()],
      controllers: [UserController],
      providers: [
        UserService,
        ...usersProviders,
        ...databaseProviders,
      ],
  }).compile();
 
  userService = module.get<UserService>(UserService);
  controller = module.get<UserController>(UserController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
