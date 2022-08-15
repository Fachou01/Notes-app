import { IsArray, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class NoteListDto {
  @IsNotEmpty()
  @IsString()
  owner: string;

  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description: string;
}
