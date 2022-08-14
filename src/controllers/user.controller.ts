import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { User } from 'src/schemas/user.schema';
import { UserDto } from 'src/services/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string): Promise<User> {
    console.log('param type', typeof id);
    return await this.userService.findById(id);
  }

  @Post('/')
  async addUser(@Body() user: UserDto): Promise<User | string> {
    return await this.userService.addUser(user);
  }

  @Put('/:id')
  async update(
    @Param('id') id: string,
    @Body() user: Partial<UserDto>,
  ): Promise<any> {
    return await this.userService.update(id, user);
  }

  @Delete('/:id')
  async delete(@Param('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
