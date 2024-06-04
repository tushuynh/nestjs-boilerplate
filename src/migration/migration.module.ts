import { UserModule } from '@modules/user/user.module';
import { Module } from '@nestjs/common';
import { MigrationUserSeed } from './seeds/migration.user.seed';
import { PrismaModule } from '@common/prisma/prisma.module';
import { CommandModule } from 'nestjs-command';

@Module({
  imports: [CommandModule, PrismaModule, UserModule],
  providers: [MigrationUserSeed],
  exports: [],
})
export class MigrationModule {}
