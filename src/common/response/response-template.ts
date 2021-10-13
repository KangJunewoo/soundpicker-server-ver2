import { ApiProperty } from '@nestjs/swagger';

export class ResponseTemplate {
  @ApiProperty({
    required: true,
    example: 'xxx',
    description: '상태코드',
  })
  public status: number;

  @ApiProperty({
    required: true,
    example: 'true/false',
    description: '요청의 성공 여부',
  })
  public success: boolean;

  @ApiProperty({
    required: true,
    example: '성공 / 권한이 없습니다 / ...',
    description: '상태 메세지',
  })
  public message: string;

  constructor(status: number, message: string) {
    this.status = status;
    this.message = message;
  }
}
