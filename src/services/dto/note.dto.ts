import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoteDto {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;

  @IsOptional()
  @IsArray()
  note: Object[];
}
