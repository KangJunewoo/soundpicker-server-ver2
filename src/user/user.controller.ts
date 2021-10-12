import { Body, Controller, Headers, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserDto } from '../user/dto/user.dto';
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
  @ApiOperation({ summary: '회원가입' })
  signUp(@Body() body: UserDto) {
    // TODO: 유저정보 dto 적용
    // validation

    console.log(body.email, body.password, body.nickname);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  signIn(@Body() body) {
    console.log(body.email, body.password);
  }

  @ApiOperation({ summary: '이메일 중복확인' })
  @Post('verify/email')
  verifyEmail(@Body('email') email: string) {
    console.log(email);
  }

  @ApiOperation({ summary: '닉네임 중복확인' })
  @Post('verify/nickname')
  verifyNickname(@Body('nickname') nickname: string) {
    console.log(nickname);
  }

  @ApiOperation({ summary: '내 정보 조회' })
  @Get('mypage')
  getMyInfo(@Headers('jwt') jwt: string) {
    console.log(jwt);
  }

  @ApiOperation({ summary: '이메일 변경' })
  @Put('email')
  updateEmail(@Headers('jwt') jwt: string, @Body('email') email: string) {
    console.log(jwt, email);
  }

  @ApiOperation({ summary: '닉네임 변경' })
  @Put('nickname')
  updateNickname(
    @Headers('jwt') jwt: string,
    @Body('nickname') nickname: string
  ) {
    console.log(jwt, nickname);
  }

  @ApiOperation({ summary: '비밀번호 변경' })
  @Put('password')
  updatePassword(
    @Headers('jwt') jwt: string,
    @Body('password') password: string
  ) {
    console.log(jwt, password);
  }
}
