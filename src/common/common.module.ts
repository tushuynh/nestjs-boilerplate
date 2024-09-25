import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import * as redisStore from 'cache-manager-redis-store';
import type { RedisClientOptions } from 'redis';
import configs from 'src/configs';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './request/request.module';
import { HttpCacheInterceptor } from './response/interceptors/httpCache.interceptor';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      cache: true,
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync<RedisClientOptions>({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        store: redisStore,
        url: configService.get('cache.redisUrl'),
        ttl: configService.get('cache.ttl'),
        max: configService.get('cache.max'),
      }),
    }),
    PrismaModule,
    RequestModule,
    ResponseModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: HttpCacheInterceptor,
    },
  ],
})
export class CommonModule {}
