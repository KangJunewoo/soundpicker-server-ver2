import { ApiProperty } from '@nestjs/swagger';

export class ResponseTemplate {
  @ApiProperty({
    required: true,
    example: 200,
    description: '상태코드',
  })
  public status: number;

  @ApiProperty({
    required: true,
    example: true,
    description: '요청의 성공 여부',
  })
  public success: boolean;

  @ApiProperty({
    required: true,
    example: '성공',
    description: '상태 메세지',
  })
  public message: string;
}
