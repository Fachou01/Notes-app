import { ArrayContains, IsArray, IsNotEmpty } from 'class-validator';

export class NoteListCollaboratorsDto {
  @IsNotEmpty()
  @IsArray()
  collaborators: Object[];
}
