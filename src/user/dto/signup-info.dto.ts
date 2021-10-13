import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../entities/User';

export class SignupInfoDto extends PickType(User, [
  'email',
  'password',
  'nickname',
] as const) {}
