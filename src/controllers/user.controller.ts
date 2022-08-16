import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/guards/jwt-auth.guard';
import { User } from 'src/schemas/user.schema';
import { UserDto } from 'src/services/dto/user.dto';
import { UserService } from 'src/services/user.service';

@Controller('api/user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('/')
  @ApiBearerAuth()
  @ApiUnauthorizedResponse({ description: 'Unauthorized' })
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'Users has been successfully returned' })
  @UseGuards(JwtAuthGuard)
  async findAll(): Promise<User[]> {
    return await this.userService.findAll();
  }

  @Get(':id')
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'User with id has been successfully returned' })
  async findById(@Param('id') id: string): Promise<User> {
    return await this.userService.findById(id);
  }

  @Post('/')
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiCreatedResponse({ description: 'User has been successfully created' })
  async addUser(@Body() user: UserDto): Promise<User | string> {
    return await this.userService.addUser(user);
  }

  @Put('/:id')
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'User with id has been successfully updated' })
  async update(
    @Param('id') id: string,
    @Body() user: Partial<UserDto>,
  ): Promise<any> {
    return await this.userService.update(id, user);
  }

  @Delete('/:id')
  @ApiForbiddenResponse({ description: 'Forbidden' })
  @ApiOkResponse({ description: 'User with id has been successfully deleted' })
  async delete(@Param('id') id: string): Promise<any> {
    return await this.userService.delete(id);
  }
}
