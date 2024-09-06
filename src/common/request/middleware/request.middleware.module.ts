import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestVersionMiddleware } from './version/request.version.middleware';
import { RequestUserAgentMiddleware } from './user-agent/request.user-agent.middleware';
import { RequestHelmetMiddleware } from './helmet/request.helmet.middleware';

@Module({})
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RequestHelmetMiddleware,
        RequestVersionMiddleware,
        RequestUserAgentMiddleware
      )
      .forRoutes('*');
  }
}
