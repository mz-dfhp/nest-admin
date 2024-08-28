import type { User } from '@prisma/client';
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import type { Request } from 'express';

declare module 'express' {
  export interface Request {
    user?: Pick<User, 'id' | 'username'>;
  }
}
