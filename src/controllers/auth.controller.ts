import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from 'src/services/auth.service';
import { LoginUserDto } from 'src/services/dto/login-user.dto';

@Controller('api/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/login')
  async login(@Body() user: LoginUserDto): Promise<any> {
    //console.log('token', typeof process.env.JWT_SECRET);
    const userResponse = await this.authService.validateUser(
      user.email,
      user.password,
    );
    console.log('user response', userResponse);
    if (!userResponse || userResponse.password !== user.password) {
      return 'Verify your credentials';
    }
    const token = await this.authService.login(userResponse);
    console.log('token', token);
    return token;
  }
}
