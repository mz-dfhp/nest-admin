import { ApiProperty, PickType, OmitType, PartialType } from '@nestjs/swagger';
import { Length, IsString } from 'class-validator';

export class UserDto {
  @ApiProperty({ description: 'The id of the user' })
  id: number;

  @ApiProperty({ description: 'The username of the user' })
  @IsString()
  @Length(1, 20)
  username: string;

  @ApiProperty({ description: 'The password of the user' })
  @IsString()
  @Length(4, 8)
  password: string;

  @ApiProperty({ description: 'The avatar of the user' })
  @IsString()
  avatar?: string;
}

export class UserIdDto extends PickType(UserDto, ['id']) {}

export class CreateUserDto extends OmitType(UserDto, ['id']) {}

export class UpdateUserDto extends PartialType(CreateUserDto) {}

export class UserLoginDto extends PickType(UserDto, ['username', 'password']) {}
