import { Connection } from 'mongoose';
import { UserSchema } from '../../models/user/user.model';


export const usersProviders = [
  {
    provide: 'USER_MODEL',
    useFactory: (connection: Connection) => connection.model('users', UserSchema),
    inject: ['DATABASE_CONNECTION'],
  },
];