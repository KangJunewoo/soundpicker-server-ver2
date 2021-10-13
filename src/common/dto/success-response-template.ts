import { ApiProperty } from '@nestjs/swagger';
import { ResponseTemplate } from './response-template';

export class SuccessResponseTemplate extends ResponseTemplate {
  @ApiProperty({
    example: {
      k1: 'v1',
      k2: 'v2',
    },
    description: '응답 내용',
  })
  public data: Record<string, unknown>;
}
