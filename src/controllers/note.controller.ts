import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Note } from 'src/schemas/note.schema';
import { AddNoteDto } from 'src/services/dto/add-note.dto';
import { NoteCollaboratorsDto } from 'src/services/dto/note-invite-collaborators.dto';
import { NoteDto } from 'src/services/dto/note.dto';
import { NoteService } from 'src/services/note.service';

@Controller('api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  async findAll(): Promise<Note[] | string> {
    return await this.noteService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<Note> {
    return await this.noteService.findById(id);
  }

  @Post('/')
  async addNote(@Body() note: NoteDto): Promise<Note | string> {
    return await this.noteService.addNote(note);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() note: Partial<NoteDto>,
  ): Promise<any> {
    return await this.noteService.update(id, note);
  }

  @Put('/add-note/:id')
  async addNotes(
    @Param('id') id: string,
    @Body() note: AddNoteDto,
  ): Promise<any> {
    return await this.noteService.addNotes(id, note);
  }

  @Put('/invite/:id')
  async inviteCollaborators(
    @Param('id') id: string,
    @Body() note: NoteCollaboratorsDto,
  ): Promise<any> {
    return await this.noteService.inviteCollaborators(id, note);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.noteService.delete(id);
  }
}
