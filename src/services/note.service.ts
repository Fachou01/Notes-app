import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Note, NoteDocument } from 'src/schemas/note.schema';
import { NoteDto } from './dto/note.dto';

@Injectable()
export class NoteService {
  constructor(@InjectModel('Note') private NoteModel: Model<NoteDocument>) {}

  async findAll(): Promise<Note[]> {
    return await this.NoteModel.find({});
  }

  async findById(id: string): Promise<Note> {
    return await this.NoteModel.findOne({
      _id: id,
    });
  }
  async addNote(note: NoteDto): Promise<Note> {
    const createdNote = new this.NoteModel(note);
    return await createdNote.save();
  }

  async update(id: string, note: Partial<NoteDto>): Promise<Note> {
    return await this.NoteModel.findOneAndUpdate({ _id: id }, note, {
      new: true,
    });
  }

  async delete(id: string): Promise<any> {
    return await this.NoteModel.deleteOne({
      _id: id,
    });
  }
}
