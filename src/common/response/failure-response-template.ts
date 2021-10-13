import { ApiProperty } from '@nestjs/swagger';
import { ResponseTemplate } from './response-template';

export class FailureResponseTemplate extends ResponseTemplate {
  constructor(status: number, message: string) {
    super(status, message);
    this.success = false;
  }
}
