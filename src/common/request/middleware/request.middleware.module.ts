import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { RequestCorsMiddleware } from './cors/request.cors.middleware';
import { RequestVersionMiddleware } from './version/request.version.middleware';
import { RequestBodyParserMiddleware } from './body-parser/request.body-parser.middleware';
import { RequestUserAgentMiddleware } from './user-agent/request.user-agent.middleware';
import { RequestHelmetMiddleware } from './helmet/request.helmet.middleware';

@Module({})
export class RequestMiddlewareModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(
        RequestHelmetMiddleware,
        RequestBodyParserMiddleware,
        RequestCorsMiddleware,
        RequestVersionMiddleware,
        RequestUserAgentMiddleware
      )
      .forRoutes('*');
  }
}
