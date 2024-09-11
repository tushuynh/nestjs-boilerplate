import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './request/request.module';
import { ResponseModule } from './response/response.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    RequestModule,
    ResponseModule,
  ],
  controllers: [],
  providers: [],
})
export class CommonModule {}
