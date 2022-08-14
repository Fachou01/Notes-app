import { ArrayContains, IsArray, IsNotEmpty } from 'class-validator';

export class NoteCollaboratorsDto {
  @IsNotEmpty()
  @IsArray()
  collaborators: Object[];
}
