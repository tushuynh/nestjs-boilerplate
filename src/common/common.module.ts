import { CacheModule } from '@nestjs/cache-manager';
import { CacheStore, Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { APP_INTERCEPTOR } from '@nestjs/core';
import configs from 'src/configs';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './request/request.module';
import { HttpCacheInterceptor } from './response/interceptors/httpCache.interceptor';
import { ResponseModule } from './response/response.module';
import Keyv from 'keyv';
import KeyvRedis from '@keyv/redis';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      cache: true,
      envFilePath: ['.env'],
    }),
    CacheModule.registerAsync({
      isGlobal: true,
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        store: new Keyv({
          store: new KeyvRedis(configService.get('cache.redisUrl')),
          ttl: configService.get('cache.ttl'),
        }) as unknown as CacheStore,
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
