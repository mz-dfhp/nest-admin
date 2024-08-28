import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(private readonly jwtService: JwtService) {}

  // 生成JWT
  async generateJwt(user: User) {
    const payload = { id: user.id, username: user.username };
    const access_token = await this.jwtService.signAsync(payload);
    return { access_token };
  }
}
