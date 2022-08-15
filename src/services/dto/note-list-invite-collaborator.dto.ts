import { Type } from 'class-transformer';
import {
  IsBoolean,
  IsNotEmpty,
  IsNotEmptyObject,
  IsObject,
  IsString,
  ValidateNested,
} from 'class-validator';

class PrivilegesDto {
  @IsNotEmpty()
  @IsBoolean()
  w: boolean;

  @IsNotEmpty()
  @IsBoolean()
  r: boolean;
}

export class NoteListCollaboratorDto {
  @IsNotEmpty()
  @IsString()
  _id: string;

  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PrivilegesDto)
  privileges: PrivilegesDto;
}
