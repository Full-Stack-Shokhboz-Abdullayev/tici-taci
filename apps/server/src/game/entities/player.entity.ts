import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { SignEnum } from '@tici-taci/typings';
import { Document } from 'mongoose';

export type PlayerDocument = Player & Document;

@Schema({ timestamps: true })
class Player {
  @Prop({ required: true })
  name: string;

  @Prop({ type: 'string', enum: SignEnum, required: true })
  sign: SignEnum;

  @Prop({ default: 0 })
  score: number;
}

export const PlayerSchema = SchemaFactory.createForClass(Player);
