import { ApiProperty } from '@nestjs/swagger';

export class LoginInfoDto {
  @ApiProperty({
    example: 'user@example.com',
    description: '사용자 이메일',
    required: true
  })
  public email: string;

  @ApiProperty({
    example: 'test123',
    description: '사용자 비밀번호',
    required: true
  })
  public password: string;

}