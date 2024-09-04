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

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/login')
  login(@Body() dto: Prisma.UserCreateInput) {
    return this.userService.login(dto);
  }

  @Get('/info')
  userinfo(@AuthUser() dto: Prisma.UserAvgAggregateOutputType) {
    return this.userService.findOne(dto.id);
  }

  @Post()
  create(@Body() dto: Prisma.UserCreateInput) {
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
  update(@Param('id') id: string, @Body() dto: Prisma.UserCreateInput) {
    return this.userService.update(+id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
