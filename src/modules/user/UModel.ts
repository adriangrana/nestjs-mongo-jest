import { Model } from 'mongoose';
import { UserDocument, UserModel } from '../../../src/model/user/user.model';

export class UModel extends Model<UserDocument> {
 static findAll(query: any): Promise<UserDocument[]> {
   return this.find(query).exec();
 }
}
