import { Body, Controller, Headers, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../common/dto/user.dto';
import { ResponseTemplateDto } from '../common/dto/responseTemplate.dto';

@ApiTags('USER')
@Controller('user')
@ApiResponse({
  status: 200,
  description: '성공',
  type: ResponseTemplateDto
})
@ApiResponse({
  status: 500,
  description: '서버 에러',
  type: ResponseTemplateDto
})
export class UserController {
  @ApiBody({
    type: [UserDto]
  })
  @Post('signup')
  signUp(@Body() body: UserDto) { // TODO: 유저정보 dto 적용
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
