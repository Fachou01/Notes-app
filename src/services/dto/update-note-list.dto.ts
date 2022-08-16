import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class UpdateNoteListDto {
  @ApiProperty({
    type: String,
    description: 'title of the Note List',
  })
  @IsNotEmpty()
  @IsString()
  title: string;

  @ApiProperty({
    type: String,
    description: 'description of the Note List',
  })
  @IsNotEmpty()
  @IsString()
  description: string;
}
