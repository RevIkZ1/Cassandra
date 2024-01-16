import {
  Body,
  Controller,
  Post,
  Get,
  Param,
  Put,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User, LoginDto } from './user.model';
import { UserService } from './user.service';
import { Response, Request } from 'express';

@Controller('User')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private jwtService: JwtService,
  ) {}

  @Get('getUser')
  async getUser(): Promise<User[]> {
    return this.userService.getAllUsers();
  }

  @Post('addUser')
  async addUser(@Body() user: User) {
    return this.userService.addUser(user);
  }

  @Post('login')
  async login(
    @Res({ passthrough: true }) response: Response,
    @Body() loginDTO: LoginDto,
  ) {
    const token = await this.userService.signIn(loginDTO);
    response.cookie('jwt', token, { httpOnly: true });
    console.log('nesto');
    let user = await this.userService.getUserByUsernameAndPassword(
      loginDTO.username,
      loginDTO.password,
    );
    console.log(user);
    const { password, ...result } = user;
    return result;
  }
  @Get('getLoggedUser')
  async getLoggedUser(@Req() request: Request) {
    try {
      console.log('Perica');
      const cookie = request.cookies['jwt'];
      const data = await this.jwtService.verifyAsync(cookie);
      if (!data) {
        throw new UnauthorizedException();
      }
      console.log(data);
      const userr = await this.userService.getUserByUsernameAndPassword(
        data['username'],
        data['password'],
      );
      console.log(userr);
      const { password, ...result } = userr;
      return result;
    } catch (e) {
      throw new UnauthorizedException();
    }
  }
  @Post('logout')
  async logout(@Res({ passthrough: true }) response: Response) {
    response.clearCookie('jwt');

    return {
      message: 'success',
    };
  }
  @Get('getUserWithId/:userId')
  async getUserWithId(@Param('userId') userId: number) {
    const user = await this.userService.findUserById(userId);
    return user;
  }
  @Get('getUserByUsername/:username')
  async getUserByUsername(@Param('username') username: string) {
    return this.userService.getUserByUser(username);
  }
  @Put('addTeamToUser/:userId/:teamId')
  async addAnimeToUser(
    @Param('userId') userId: string,
    @Param('teamId') teamId: string,
  ): Promise<User> {
    return this.userService.addTeamToUser(userId, teamId);
  }
  @Get('VratiSveTimove/:id')
  async getEmployeeById(@Param('id') id: string) {
    const timoviZaLigu = await this.userService.VratiSveTimove(id);
    console.log(timoviZaLigu);
    return timoviZaLigu;
  }
}
