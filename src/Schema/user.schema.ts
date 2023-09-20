import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

export enum Roles{
    SUPER_ADMIN = 'super_admin',
    USER = 'user'
}

@Schema({timestamps:true})
export class User {
  @Prop()
  email: string;

  @Prop()
  name: string;

  @Prop()
  password: string;

  @Prop({enum: [...Object.values(Roles)] })
  role: string;

  @Prop()
  isActive: boolean;

  @Prop()
  token: string;
}

export const UserSchema = SchemaFactory.createForClass(User);