import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../entities/User';

export class LoginInfoDto extends PickType(User, [
  'email',
  'password',
] as const) {}
