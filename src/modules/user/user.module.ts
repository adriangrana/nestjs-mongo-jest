import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { DatabaseModule } from '../../lib/mongodb/database.module';
import { usersProviders } from './user.providers';

@Module({
  imports: [DatabaseModule],
  controllers: [UserController],
  providers: [UserService, ...usersProviders],
})
export class UserModule {}
