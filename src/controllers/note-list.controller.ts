import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Privilege } from 'src/decorators/privilege.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { NoteList } from 'src/schemas/note-list.schema';
import { AddNoteDto } from 'src/services/dto/add-note.dto';
import { NoteListCollaboratorDto } from 'src/services/dto/note-list-invite-collaborator.dto';

import { NoteListDto } from 'src/services/dto/note-list.dto';
import { NoteListService } from 'src/services/note-list.service';

@Controller('api/note-list')
export class NoteListController {
  constructor(private readonly noteListService: NoteListService) {}

  @Get('/')
  @UseGuards(JwtAuthGuard)
  //@Privilege('W')
  async findAllNoteList(@Req() req): Promise<NoteList[] | string> {
    console.log('request guard', req.user);
    return await this.noteListService.findAllNoteList();
  }

  @Get(':id')
  async findNoteListById(@Param('id') id: string): Promise<NoteList> {
    return await this.noteListService.findNoteListById(id);
  }

  @Post('/')
  async addNoteList(@Body() note: NoteListDto): Promise<NoteList | string> {
    return await this.noteListService.addNoteList(note);
  }

  @Put('/:id')
  async updateNoteList(
    @Param('id') id: string,
    @Body() note: Partial<NoteListDto>,
  ): Promise<any> {
    return await this.noteListService.updateNoteList(id, note);
  }

  @Put('/invite/:id')
  async inviteCollaborators(
    @Param('id') id: string,
    @Body() collaborator: NoteListCollaboratorDto,
  ): Promise<any> {
    return await this.noteListService.inviteCollaborators(id, collaborator);
  }

  @Delete('/:id')
  async deleteNoteList(@Param('id') id: string): Promise<any> {
    return await this.noteListService.deleteNoteList(id);
  }

  ///////////////////////// NOTE END-POINTS ///////////////////////
  // ADD NOTE
  @Put('/add-note/:id')
  //@Privilege('W')
  async addNote(
    @Param('id') id: string,
    @Body() note: AddNoteDto,
  ): Promise<any> {
    return await this.noteListService.addNote(id, note);
  }

  // MODIFY NOTE
  @Put('/update-note/:noteListId/:noteId')
  //@Privilege('W')
  async updateNote(
    @Param('noteListId') noteListId: string,
    @Param('noteId') noteId: string,
    @Body() note: AddNoteDto,
  ): Promise<any> {
    return await this.noteListService.updateNote(noteListId, noteId, note);
  }

  // DELETE NOTE
  @Delete('/delete-note/:noteListId/:noteId')
  //@Privilege('W')
  async deleteNote(
    @Param('noteListId') noteListId: string,
    @Param('noteId') noteId: string,
  ): Promise<any> {
    return await this.noteListService.deleteNote(noteListId, noteId);
  }
}
