import { ApiProperty } from '@nestjs/swagger';
import { IsBoolean, IsNotEmpty } from 'class-validator';

export class UpdateCollaboratorPrivilegesDto {
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
