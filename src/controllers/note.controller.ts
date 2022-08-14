import { Controller, Get } from '@nestjs/common';
import { NoteService } from 'src/services/note.service';

@Controller('api/note')
export class NoteController {
  constructor(private readonly noteService: NoteService) {}

  @Get('/')
  findAll(): string {
    return this.noteService.findAll();
  }
}
