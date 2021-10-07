import { ApiProperty } from '@nestjs/swagger';

// TODO: 실패할 경우도 따로 dto를 만들어야 할것같은데 어느 형태가 적절할까?
export class ResponseTemplateDto {
  @ApiProperty({
    required: true,
    example: 200,
    description: '상태코드'
  })
  public status: number;

  @ApiProperty({
    required: true,
    example: true,
    description: '요청의 성공 여부'
  })
  public success: boolean;

  @ApiProperty({
    required: true,
    example: '성공',
    description: '상태 메세지'
  })
  public message: string;

  // TODO: 데이터 집어넣기
  public data: Record<string, unknown>;
}