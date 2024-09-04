import {
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { resolve } from 'node:path';
import { APP_GUARD, APP_PIPE } from '@nestjs/core';
import { ServeStaticModule } from '@nestjs/serve-static';

import { AppController } from './app.controller';
import { AppService } from './app.service';

import { LoggerMiddleware } from 'src/common/middleware/logger';
import { AuthGuard } from 'src/auth/auth.guard';

import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { UploadModule } from './upload/upload.module';
@Module({
  imports: [
    ServeStaticModule.forRoot({ rootPath: resolve(process.cwd(), 'static') }),
    UserModule,
    AuthModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
    {
      provide: APP_PIPE,
      useClass: ValidationPipe,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
