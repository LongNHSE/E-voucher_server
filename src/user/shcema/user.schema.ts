import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';

export type UserDocument = User & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class User {
  @Prop({ required: true })
  firstName: string;

  @Prop({ required: true })
  lastName: string;

  @Prop({ required: true })
  username: string;

  @Prop({ required: true, unique: true })
  email: string;

  @Prop()
  password: string;

  @Prop({ enum: ['admin', 'user', 'staff', 'host'], default: 'user' })
  role: string;

  @Prop({ default: 'active', enum: ['active', 'inactive'] })
  status: string;

  @Prop()
  avatar: string;

  @Prop({ unique: true })
  phone: string;
  //   @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Role' })
  //   role: string;
}

export const userSchema = SchemaFactory.createForClass(User);
