import { AuthService } from './auth.service';
import { Strategy } from 'passport-local';
import { PassportStrategy } from '@nestjs/passport';
import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject('AUTH_SERVICE') private readonly authService: AuthService,
  ) {
    super();
  }
  async validate(username: string, password: string) {
    const user = await this.authService.validateUser(username, password);
    console.log(user);
    if (!user) throw new UnauthorizedException();
    else {
      return user;
    }
  }
}
