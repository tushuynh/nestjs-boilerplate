import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { ThrottlerModule } from '@nestjs/throttler';
import { RequestMiddlewareModule } from './middleware/request.middleware.module';

@Module({
  imports: [
    RequestMiddlewareModule,
    ThrottlerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (config: ConfigService) => [
        {
          ttl: config.get<number>('request.throttler.ttl'),
          limit: config.get('request.throttler.limit'),
        },
      ],
    }),
  ],
  providers: [],
})
export class RequestModule {}
