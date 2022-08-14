import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type NoteDocument = Note & Document;

@Schema()
export class Note {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop()
  note: Object[];

  @Prop()
  collaborators: Object[];
}

export const NoteSchema = SchemaFactory.createForClass(Note);
