import {
  Controller,
  Post,
  UseGuards,
  Request,
  Res,
  Body,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { LoginDto } from 'src/user/user.model';
@Controller('auth')
export class AuthController {}
