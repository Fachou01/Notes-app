import { Module } from '@nestjs/common';
import { NoteController } from 'src/controllers/note.controller';
import { NoteService } from 'src/services/note.service';

@Module({
  controllers: [NoteController],
  providers: [NoteService],
})
export class NoteModule {}
