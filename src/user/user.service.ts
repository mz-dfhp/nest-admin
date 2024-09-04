import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma.service';
import { Prisma } from '@prisma/client';
import { AuthService } from 'src/auth/auth.service';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private auth: AuthService,
  ) {}

  async login(dto: Omit<Prisma.UserCreateInput, 'avatar'>) {
    const user = await this.prisma.user.findUnique({
      where: {
        username: dto.username,
        password: dto.password,
      },
    });
    return this.auth.generateJwt(user);
  }

  create(dto: Prisma.UserCreateInput) {
    return this.prisma.user.create({
      data: dto,
    });
  }

  async findAll(dto: ListParams & Pick<Prisma.UserCreateInput, 'username'>) {
    const pageNo = +dto.pageNo || 1;
    const pageSize = +dto.pageSize || 10;
    const skip = (pageNo - 1) * pageSize;
    const take = pageSize;
    const where: Prisma.UserWhereInput = {
      username: { contains: dto.username },
    };
    const total = await this.prisma.user.count({
      where,
    });
    const list = await this.prisma.user.findMany({
      where,
      skip,
      take,
    });
    return {
      list,
      total,
    };
  }

  findOne(id: number) {
    return this.prisma.user.findUnique({
      where: {
        id,
      },
    });
  }

  update(id: number, dto: Prisma.UserCreateInput) {
    return this.prisma.user.update({
      where: {
        id,
      },
      data: dto,
    });
  }

  remove(id: number) {
    return this.prisma.user.delete({
      where: {
        id,
      },
    });
  }
}
