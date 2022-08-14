import { IsEmail, IsNotEmpty, IsOptional, IsString } from 'class-validator';
import { UserDto } from './user.dto';

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
  collaborators: UserDto[];
}
