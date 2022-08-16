import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { NoteListService } from 'src/services/note-list.service';

@Injectable()
export class PrivilegeGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private noteListService: NoteListService,
  ) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const privilege = this.reflector.get<string[]>(
      'privilege',
      context.getHandler(),
    );
    const { user } = context.switchToHttp().getRequest();
    const noteListId = context.switchToHttp().getRequest().params['noteListId'];

    //IF NO USER PASSED TO REQUEST
    if (!user) return false;
    // IF THERE IS NO PRIVILEGES
    if (!privilege) {
      return true;
    }
    const noteList = await this.noteListService.findNoteListById(noteListId);

    // IF THE REQUESTING USER IS THE OWNER OF THE NOTE LIST
    if (privilege[0] == 'OWNER') {
      return noteList.owner == user._id;
    }

    // IF THE REQUESTING USER HAS READ PRIVILEGE AS COLLABORATOR OR AS OWNER
    if (privilege[0] == 'READ') {
      if (noteList.owner == user._id) {
        return true;
      }
      const collaborator = noteList.collaborators.find(
        (collaborator: any) => collaborator.userId == user._id,
      );
      console.log(collaborator);
      if (collaborator) {
        return true;
      }
    }

    // IF THE REQUESTING USER HAS WRITE PRIVILEGE AS COLLABORATOR OR AS OWNER
    if (privilege[0] == 'WRITE') {
      if (noteList.owner == user._id) {
        return true;
      }
      const collaborator = noteList.collaborators.find(
        (collaborator: any) => collaborator.userId == user._id,
      );
      if (!collaborator) {
        return false;
      }
      return collaborator['privileges'].w == true;
    }

    return false;
  }
}
