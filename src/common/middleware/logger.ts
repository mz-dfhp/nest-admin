import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, _res: Response, next: NextFunction) {
    const info = {
      method: req.method,
      url: req.url,
      baseUrl: req.baseUrl,
      headers: req.headers,
      query: req.query,
      params: req.params,
      body: req.body,
    };
    console.log(info);
    next();
  }
}
