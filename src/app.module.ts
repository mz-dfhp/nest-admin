import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { resolve } from 'node:path';
import { APP_GUARD } from '@nestjs/core';
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
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
