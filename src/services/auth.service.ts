import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from './user.service';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findByEmail(email);
    console.log('user validate', user);
    if (user && user.password === password) {
      const { password, ...result } = user;
      return result['_doc'];
    }
    return null;
  }

  async login(user: any) {
    const payload = { _id: user._id, name: user.name };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
