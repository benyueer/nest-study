import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { GqlAuthGuard } from './auth.guard';
import { AuthService } from './auth.service';

@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('auth/login')
  login(@Body() { email, password }) {
    return this.authService.login(email, password);
  }

  @UseGuards(GqlAuthGuard)
  @Get('auth/test')
  test() {
    return 'hello';
  }
}
