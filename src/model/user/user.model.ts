import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document, Model } from 'mongoose';

export type UserDocument = User & Document;

@Schema({})
export class User {
  @Prop({ required: true })
  name: string;

  @Prop({ required: true })
  email: string;
}

 const UserSchema = SchemaFactory.createForClass(User);

 interface UserModel extends Model<UserDocument> {}

export { UserSchema,UserModel };