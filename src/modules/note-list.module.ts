import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MongooseModule } from '@nestjs/mongoose';
import { NoteListController } from 'src/controllers/note-list.controller';
import { PrivilegeGuard } from 'src/guards/privilege.guard';
import { NoteListSchema } from 'src/schemas/note-list.schema';
import { NoteListService } from 'src/services/note-list.service';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'NoteList', schema: NoteListSchema }]),
  ],
  controllers: [NoteListController],
  providers: [NoteListService],
  exports: [NoteListService],
})
export class NoteListModule {}
