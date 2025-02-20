import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { CommandModule, CommandService } from 'nestjs-command';
import { MigrationModule } from './migration/migration.module';

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(MigrationModule, {
    logger: ['error'],
  });

  const logger = new Logger(MigrationModule.name);

  try {
    await app.select(CommandModule).get(CommandService).exec();
    process.exit(0);
  } catch (err: any) {
    logger.error(err, 'Migration');
    process.exit(1);
  }
}

bootstrap();
