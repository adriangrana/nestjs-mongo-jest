import { ConfigModule, ConfigService } from '@nestjs/config';
import { Test } from '@nestjs/testing';

import { DatabaseModule } from '../database/database.module';
import { databaseProviders } from '../database/database.providers';
import { UserController } from './user.controller';
import { usersProviders } from './user.providers';
import { UserService } from './user.service';
describe('UserService', () => {
  let service: UserService;
  const env = {
    GREETING_MSG: 'WELLCOME TO NESTJS SEED PROJECT',
    DATABASE_HOST: 'mongodb://127.0.0.1',
    DATABASE_PORT: 27017,
  };
  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [DatabaseModule, ConfigModule.forRoot()],
      controllers: [UserController],
      providers: [
        UserService,
        ...usersProviders,
        ...databaseProviders,
        {
          provide: ConfigService,
          useValue: {
            get: jest.fn((key: string) => {
              if (env[key]) {
                return env[key];
              }
              return null;
            }),
          },
        },
      ],
    }).compile();

    service = module.get<UserService>(UserService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
