import { LoginInfoDto } from './login-info.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UserDto extends LoginInfoDto {
  @ApiProperty({
    required: true,
    example: '카초',
    description: '사용자 닉네임'
  })
  nickname: string;

}