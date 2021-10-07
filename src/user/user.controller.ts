import { Body, Controller, Headers, Get, Post, Put } from '@nestjs/common';

@Controller('user')
export class UserController {

  @Post('signup')
  signUp(@Body() body) { // TODO: 유저정보 dto 적용
    console.log(body.email, body.password, body.nickname);

  }

  @Post('signin')
  signIn(@Body() body) {
    console.log(body.email, body.password);
  }

  @Post('verify/email')
  verifyEmail(@Body('email') email: string) {
    console.log(email);

  }

  @Post('verify/nickname')
  verifyNickname(@Body('nickname') nickname: string) {
    console.log(nickname);

  }

  @Get('mypage')
  getMyInfo(@Headers('jwt') jwt: string) {
    console.log(jwt);
  }

  @Put('email')
  updateEmail(@Headers('jwt') jwt: string, @Body('email') email: string) {
    console.log(jwt, email);
  }

  @Put('nickname')
  updateNickname(@Headers('jwt') jwt: string, @Body('nickname') nickname: string) {
    console.log(jwt, nickname);
  }

  @Put('password')
  updatePassword(@Headers('jwt') jwt: string, @Body('password') password: string) {
    console.log(jwt, password);
  }


}
