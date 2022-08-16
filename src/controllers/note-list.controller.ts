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
import {
  ApiBearerAuth,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Privilege } from 'src/decorators/privilege.decorator';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { PrivilegeGuard } from 'src/guards/privilege.guard';
import { NoteList } from 'src/schemas/note-list.schema';
import { AddNoteDto } from 'src/services/dto/add-note.dto';
import { NoteListCollaboratorDto } from 'src/services/dto/note-list-invite-collaborator.dto';

import { NoteListDto } from 'src/services/dto/note-list.dto';
import { NoteListService } from 'src/services/note-list.service';

@Controller('api/note-list')
export class NoteListController {
  constructor(private readonly noteListService: NoteListService) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'Notes List has been successfully returned' })
  @UseGuards(JwtAuthGuard)
  async findAllNoteList(@Req() req): Promise<NoteList[] | string> {
    console.log('request guard', req.user);
    return await this.noteListService.findAllNoteList();
  }

  @Get(':noteListId')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'Note List with id has been successfully returned',
  })
  @UseGuards(JwtAuthGuard)
  async findNoteListById(@Param('noteListId') id: string): Promise<NoteList> {
    return await this.noteListService.findNoteListById(id);
  }

  @Post('/')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'Note List has been successfully created',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async addNoteList(@Body() note: NoteListDto): Promise<NoteList | string> {
    return await this.noteListService.addNoteList(note);
  }

  @Put('/:noteListId')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'Note List with id has been successfully updated',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('WRITE')
  async updateNoteList(
    @Param('noteListId') id: string,
    @Body() note: Partial<NoteListDto>,
  ): Promise<any> {
    return await this.noteListService.updateNoteList(id, note);
  }

  @Delete('/:noteListId')
  @ApiOkResponse({
    description: 'Note List with id has been successfully delete',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('WRITE')
  async deleteNoteList(@Param('noteListId') id: string): Promise<any> {
    return await this.noteListService.deleteNoteList(id);
  }

  ///////////////////////// NOTE END-POINTS ///////////////////////
  // ADD NOTE
  @Put('/add-note/:noteListId')
  @ApiOkResponse({
    description: 'Note has been successfully created',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('WRITE')
  async addNote(
    @Param('noteListId') id: string,
    @Body() note: AddNoteDto,
  ): Promise<any> {
    return await this.noteListService.addNote(id, note);
  }

  // MODIFY NOTE
  @Put('/update-note/:noteListId/:noteId')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'Note with id has been successfully updated',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('WRITE')
  async updateNote(
    @Param('noteListId') noteListId: string,
    @Param('noteId') noteId: string,
    @Body() note: AddNoteDto,
  ): Promise<any> {
    return await this.noteListService.updateNote(noteListId, noteId, note);
  }

  // DELETE NOTE
  @Delete('/delete-note/:noteListId/:noteId')
  @ApiOkResponse({
    description: 'Note with id has been successfully deleted',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('WRITE')
  async deleteNote(
    @Param('noteListId') noteListId: string,
    @Param('noteId') noteId: string,
  ): Promise<any> {
    return await this.noteListService.deleteNote(noteListId, noteId);
  }

  ///////////////////////// COLLABORATORS END-POINTS ///////////////////////
  @Put('/invite-collaborator/:noteListId')
  @ApiOkResponse({
    description: 'collaborator has been successfully added',
  })
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('OWNER')
  async inviteCollaborators(
    @Param('noteListId') id: string,
    @Body() collaborator: NoteListCollaboratorDto,
  ): Promise<any> {
    return await this.noteListService.inviteCollaborators(id, collaborator);
  }

  @Delete('/delete-collaborator/:noteListId/:collaboratorId')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'collaborator has been successfully deleted',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('OWNER')
  async deleteCollaborator(
    @Param('noteListId') noteListId: string,
    @Param('collaboratorId') collaboratorId: string,
  ): Promise<any> {
    return await this.noteListService.deleteCollaborator(
      noteListId,
      collaboratorId,
    );
  }
}
