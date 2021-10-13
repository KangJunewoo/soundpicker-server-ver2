import { Document } from 'mongoose';
import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Log {
  @Prop({ type: Number, required: true })
  type: number;

  @Prop({ type: Date, required: true })
  loggedAt: Date;

  constructor(type: number) {
    this.type = type;
  }
}

export type LogDocument = Log & Document;

export const LogSchema = SchemaFactory.createForClass(Log);
