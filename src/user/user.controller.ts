import { Body, Controller, Headers, Get, Post, Put } from '@nestjs/common';
import { ApiBody, ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { UserInfoDto } from './dto/user-info.dto';
import { UserService } from './user.service';
import { SignupInfoDto } from './dto/signup-info.dto';
import { LoginInfoDto } from './dto/login-info.dto';
import * as jwtService from '../common/jwt/jwt';
import { SuccessResponseTemplate } from '../common/response/success-response-template';
import { FailureResponseTemplate } from '../common/response/failure-response-template';

@ApiTags('USER')
@Controller('user')
@ApiResponse({
  status: 200,
  description: '성공',
  type: SuccessResponseTemplate,
})
@ApiResponse({
  status: 400,
  description: '클라이언트 에러',
  type: FailureResponseTemplate,
})
@ApiResponse({
  status: 500,
  description: '서버 에러',
  type: FailureResponseTemplate,
})
export class UserController {
  constructor(private userService: UserService) {}

  @ApiBody({
    type: [UserInfoDto],
  })
  @Post('signup')
  @ApiOperation({ summary: '회원가입' })
  async signUp(@Body() body: SignupInfoDto): Promise<any> {
    // TODO: validation 모듈화
    return await this.userService.signUp(body);
  }

  @ApiOperation({ summary: '로그인' })
  @Post('signin')
  async signIn(@Body() body: LoginInfoDto) {
    return await this.userService.signIn(body);
  }

  @ApiOperation({ summary: '이메일 중복확인' })
  @Post('verify/email')
  async verifyEmail(@Body('email') email: string) {
    return await this.userService.checkEmail(email);
  }

  @ApiOperation({ summary: '닉네임 중복확인' })
  @Post('verify/nickname')
  async verifyNickname(@Body('nickname') nickname: string) {
    return await this.userService.checkNickname(nickname);
  }

  @ApiOperation({ summary: '내 정보 조회' })
  @Get('mypage')
  async getMyInfo(@Headers('jwt') jwt: string) {
    const { id } = await jwtService.verify(jwt);
    return await this.userService.getMyInfo(id);
  }

  @ApiOperation({ summary: '이메일 변경' })
  @Put('email')
  async updateEmail(@Headers('jwt') jwt: string, @Body('email') email: string) {
    const { id } = await jwtService.verify(jwt);
    return await this.userService.changeEmail(id, email);
  }

  @ApiOperation({ summary: '닉네임 변경' })
  @Put('nickname')
  async updateNickname(
    @Headers('jwt') jwt: string,
    @Body('nickname') nickname: string,
  ) {
    const { id } = await jwtService.verify(jwt);
    return await this.userService.changeNickname(id, nickname);
  }

  @ApiOperation({ summary: '비밀번호 변경' })
  @Put('password')
  async updatePassword(
    @Headers('jwt') jwt: string,
    @Body('password') password: string,
  ) {
    const { id } = await jwtService.verify(jwt);
    return await this.userService.changePassword(id, password);
  }
}
