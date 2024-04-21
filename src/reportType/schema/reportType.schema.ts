import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

export type ReportTypeDocument = ReportType & Document;
@Schema({
  toJSON: {
    getters: true,
    virtuals: true,
  },
  timestamps: true,
})
export class ReportType {
  @Prop({ required: true })
  name: string;
}
export const reportTypeSchema = SchemaFactory.createForClass(ReportType);
