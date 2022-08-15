import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { Document } from 'mongoose';
import { User } from './user.schema';

export type NoteListDocument = NoteList & Document;

@Schema()
export class NoteList {
  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  owner: User;

  @Prop({ required: true })
  title: string;

  @Prop()
  description: string;

  @Prop({
    type: [
      {
        description: {
          type: String,
        },
      },
    ],
  })
  notes: Object[];

  @Prop()
  collaborators: Object[];
}

export const NoteListSchema = SchemaFactory.createForClass(NoteList);
