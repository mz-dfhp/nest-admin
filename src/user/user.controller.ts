import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  Req,
} from '@nestjs/common';
import { Request } from 'express';
import { Prisma } from '@prisma/client';
import { IFindAllQuery, UserService } from './user.service';
import { Public } from 'src/auth/auth.decorator';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Public()
  @Post('/login')
  login(@Body() dto: Prisma.UserCreateInput) {
    return this.userService.login(dto);
  }

  @Get('/info')
  userinfo(@Req() req: Request) {
    return this.userService.findOne(req.user.id);
  }

  @Post()
  create(@Body() dto: Prisma.UserCreateInput) {
    return this.userService.create(dto);
  }

  @Get()
  findAll(@Query() query: IFindAllQuery) {
    return this.userService.findAll(query);
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
