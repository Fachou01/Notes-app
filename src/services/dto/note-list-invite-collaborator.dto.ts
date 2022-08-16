import { ApiProperty } from '@nestjs/swagger';
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
  @ApiProperty({
    type: String,
    description: 'write privileges of the Collaborator(user)',
  })
  @IsNotEmpty()
  @IsBoolean()
  w: boolean;

  @ApiProperty({
    type: String,
    description: 'read privileges of the Collaborator(user)',
  })
  @IsNotEmpty()
  @IsBoolean()
  r: boolean;
}

export class NoteListCollaboratorDto {
  @ApiProperty({
    type: String,
    description: 'id of the Collaborator(user)',
  })
  @IsNotEmpty()
  @IsString()
  userId: string;

  @ApiProperty({
    type: Object,
    description: 'priveleges object of the Collaborator(user)',
  })
  @IsNotEmpty()
  @IsNotEmptyObject()
  @ValidateNested()
  @Type(() => PrivilegesDto)
  privileges: PrivilegesDto;
}
