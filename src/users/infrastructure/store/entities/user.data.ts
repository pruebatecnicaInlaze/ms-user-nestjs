import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

import { UserInterface } from '../../../domain';

@Schema({ collection: 'Users', versionKey: false })
export class UserData implements UserInterface {
  @Prop({ index: true })
  public id: string;

  @Prop({ required: true })
  public fullName: string;

  @Prop({ required: true, index: true })
  public email: string;

  @Prop()
  public createAt: Date;
}

export type UserDataDocument = HydratedDocument<UserData>;
export const UseDataSchema = SchemaFactory.createForClass(UserData);
