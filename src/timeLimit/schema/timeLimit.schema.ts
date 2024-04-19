import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type TimeLimitDocument = TimeLimit & Document;

@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class TimeLimit {
  @Prop({ required: true })
  name: number;
}
export const TimeLimitSchema = SchemaFactory.createForClass(TimeLimit);
