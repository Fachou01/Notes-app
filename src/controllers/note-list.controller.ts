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
import { UpdateCollaboratorPrivilegesDto } from 'src/services/dto/update-collaborator-privileges.dto';
import { UpdateNoteListDto } from 'src/services/dto/update-note-list.dto';
import { NoteListService } from 'src/services/note-list.service';

@Controller('api/note-list')
export class NoteListController {
  constructor(private readonly noteListService: NoteListService) {}

  //PUBLIC ENPOINTS FOR ADMIN
  @Get('/public')
  @ApiOkResponse({ description: 'Notes List has been successfully returned' })
  async findAllNoteList(): Promise<NoteList[] | string> {
    return await this.noteListService.findAllNoteList();
  }
  ///////////////////////PROTECTED ROUTES////////////////////////////////

  @Get('/')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'Notes List has been successfully returned' })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  async findAllNoteListByUserId(@Req() req): Promise<NoteList[] | string> {
    const userId = req.user._id;
    return await this.noteListService.findAllNoteListByUserId(userId);
  }

  @Get(':noteListId')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'Note List with id has been successfully returned',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('READ')
  async findNoteListById(
    @Req() req,
    @Param('noteListId') id: string,
  ): Promise<NoteList> {
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
  async addNoteList(
    @Req() req,
    @Body() note: NoteListDto,
  ): Promise<NoteList | string> {
    const userId = req.user._id;
    console.log('userId req', userId);
    return await this.noteListService.addNoteList(note, userId);
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
    @Body() note: UpdateNoteListDto,
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
    console.log('collab', collaborator);
    return await this.noteListService.inviteCollaborator(id, collaborator);
  }

  @Put('/update-collaborator-privileges/:noteListId/:collaboratorId')
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({
    description: 'collaborator privileges has been successfully updated',
  })
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard, PrivilegeGuard)
  @Privilege('OWNER')
  async updateCollaboratorPrivileges(
    @Param('noteListId') noteListId: string,
    @Param('collaboratorId') collaboratorId: string,
    @Body() privileges: UpdateCollaboratorPrivilegesDto,
  ): Promise<any> {
    return await this.noteListService.updateCollaboratorPrivileges(
      noteListId,
      collaboratorId,
      privileges,
    );
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
