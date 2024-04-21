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
  duration: number;

  @Prop({ required: true })
  isActive: boolean;
}
export const TimeLimitSchema = SchemaFactory.createForClass(TimeLimit);
