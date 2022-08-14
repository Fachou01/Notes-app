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
  async addUser(@Body() note: NoteDto): Promise<Note | string> {
    return await this.noteService.addNote(note);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() note: Partial<NoteDto>,
  ): Promise<any> {
    return await this.noteService.update(id, note);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.noteService.delete(id);
  }
}
