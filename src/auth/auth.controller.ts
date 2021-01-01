import {
  Controller,
  Request,
  Res,
  Body,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { LocalAuthGuard } from './local-auth.guard';
import { AuthService } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Res() response: Response) {
    const { user } = req;
    const { token } = await this.authService.getCookieWithJwtToken(user);
    response.cookie('AuthCookie', token, {
      maxAge: 1000 * 60 * 10,
      httpOnly: true,
    });
    user.password = undefined;
    return response.send({
      user,
      token,
    });
  }

  @Post('/register')
  async register(@Body() createUserDto: CreateUserDto) {
    return this.authService.register(createUserDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('/logout')
  async logOut(@Res() response: Response) {
    response.setHeader('Set-Cookie', this.authService.getCookieForLogOut());
    response.send({
      success: true,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Get('/profile')
  getProfile(@Request() req) {
    return req.user;
  }
}
