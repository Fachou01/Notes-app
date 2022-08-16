import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { NoteList, NoteListDocument } from 'src/schemas/note-list.schema';
import { AddNoteDto } from './dto/add-note.dto';
import { NoteListCollaboratorDto } from './dto/note-list-invite-collaborator.dto';

import { NoteListDto } from './dto/note-list.dto';

@Injectable()
export class NoteListService {
  constructor(
    @InjectModel('NoteList') private NoteListModel: Model<NoteListDocument>,
  ) {}

  async findAllNoteList(): Promise<NoteList[]> {
    return await this.NoteListModel.find({});
  }

  async findNoteListById(id: string): Promise<NoteList> {
    return await this.NoteListModel.findOne({
      _id: id,
    });
  }
  async addNoteList(note: NoteListDto): Promise<NoteList> {
    const createdNote = new this.NoteListModel(note);
    return await createdNote.save();
  }

  async updateNoteList(
    id: string,
    note: Partial<NoteListDto>,
  ): Promise<NoteList> {
    return await this.NoteListModel.findOneAndUpdate(
      { _id: id },
      {
        title: note.title,
        description: note.description,
      },
      {
        new: true,
      },
    );
  }

  async inviteCollaborators(
    id: string,
    collaborator: NoteListCollaboratorDto,
  ): Promise<NoteList | string> {
    return await this.NoteListModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { collaborators: collaborator },
      },
      {
        new: true,
      },
    );
  }

  async deleteNoteList(id: string): Promise<any> {
    return await this.NoteListModel.deleteOne({
      _id: id,
    });
  }

  // ADD NOTE
  async addNote(id: string, note: AddNoteDto): Promise<NoteList | string> {
    const addNote = {
      description: note.description,
    };
    return await this.NoteListModel.findOneAndUpdate(
      { _id: id },
      {
        $push: { notes: addNote },
      },
      {
        new: true,
      },
    );
  }

  // UPDATE NOTE
  async updateNote(
    noteListId: string,
    noteId: string,
    note: AddNoteDto,
  ): Promise<NoteList | string> {
    return await this.NoteListModel.findOneAndUpdate(
      { _id: noteListId, 'notes._id': noteId },
      {
        $set: { 'notes.$.description': note.description },
      },
      {
        new: true,
      },
    );
  }

  // DELETE NOTE
  async deleteNote(
    noteListId: string,
    noteId: string,
  ): Promise<NoteList | string> {
    return await this.NoteListModel.findOneAndUpdate(
      { _id: noteListId },
      {
        $pull: { notes: { _id: noteId } },
      },
      {
        new: true,
      },
    );
  }

  async deleteCollaborator(
    noteListId: string,
    collaboratorId: string,
  ): Promise<NoteList | string> {
    return await this.NoteListModel.findOneAndUpdate(
      { _id: noteListId },
      {
        $pull: { collaborators: { _id: collaboratorId } },
      },
      {
        new: true,
      },
    );
  }
}
