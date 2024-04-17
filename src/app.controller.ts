import { Controller, Get, Post, Req, Res, UseGuards } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from './auth/auth.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService, private authService: AuthService) {}


  @UseGuards(AuthGuard('local'))
  @Post('auth/login')
  async login(@Req() req){
    return this.authService.login(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test')
  async data(){
       return 'success';
  }

  @UseGuards(AuthGuard('google'))
  @Get('google')  
  async googleLogin(){

  }

  @UseGuards(AuthGuard('google'))
  @Get('auth/google/callback')  
  async callback(@Req() req, @Res() res){
    const jwt = await this.authService.login(req.user);
    res.set('authorization', jwt.access_token);
    return res.json(req.user);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get('test1')
  async test1(@Res() res){
    return res.json('success');
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
