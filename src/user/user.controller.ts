import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { UserService } from './user.service';
import { Public } from 'src/auth/auth.decorator';
import { AuthUser } from './user.decorator';
import { ApiTags } from '@nestjs/swagger';
import { UserLoginDto, CreateUserDto, UserIdDto } from './user.dto';

@ApiTags('Users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/login')
  login(@Body() dto: UserLoginDto) {
    return this.userService.login(dto);
  }

  @Get('/info')
  userinfo(@AuthUser('id') dto: UserIdDto) {
    return this.userService.findOne(dto.id);
  }

  @Post()
  create(@Body() dto: CreateUserDto) {
    return this.userService.create(dto);
  }

  @Get()
  findAll(@Query() dto: ListParams & Pick<Prisma.UserCreateInput, 'username'>) {
    return this.userService.findAll(dto);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() dto: CreateUserDto) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
