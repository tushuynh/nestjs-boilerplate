import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import configs from 'src/configs';
import { PrismaModule } from './prisma/prisma.module';
import { RequestModule } from './request/request.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: configs,
      envFilePath: ['.env'],
    }),
    PrismaModule,
    RequestModule,
  ],
  controllers: [],
  providers: [],
})
export class CommonModule {}
