import { ApiProperty, PickType, OmitType } from '@nestjs/swagger';

export class UserDto {
  @ApiProperty({ description: 'The id of the user' })
  id: number;

  @ApiProperty({ description: 'The username of the user' })
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  password: string;

  @ApiProperty({ description: 'The avatar of the user' })
  avatar?: string;
}

export class UserIdDto extends PickType(UserDto, ['id']) {}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}

export class UserLoginDto extends PickType(UserDto, ['username', 'password']) {}
