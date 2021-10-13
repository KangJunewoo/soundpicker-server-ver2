import { ApiProperty, PickType } from '@nestjs/swagger';
import { User } from '../../entities/User';

export class UserInfoDto extends PickType(User, [
  'email',
  'nickname',
] as const) {}
