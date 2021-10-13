import { ApiProperty } from '@nestjs/swagger';
import { ResponseTemplate } from './response-template';

export class SuccessResponseTemplate extends ResponseTemplate {
  constructor(status: number, message: string, data: Record<string, unknown>) {
    super(status, message);
    this.success = true;
    this.data = data;
  }

  @ApiProperty({
    required: true,
    example: {
      k1: 'v1',
      k2: 'v2'
    },
    description: '응답 내용'
  })
  public data: Record<string, unknown>;


}
