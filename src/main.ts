import { Logger, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestApplication, NestFactory } from '@nestjs/core';
import { AppModule } from './app/app.module';
import swaggerInit from './swagger';

async function bootstrap() {
  const app: NestApplication = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);
  const port = configService.get<number>('port');
  const globalPrefix = configService.get<string>('app.globalPrefix');

  // Version
  const versionEnable = configService.get<string>('app.versioning.enable');
  const versionPrefix = configService.get<string>('app.versioning.prefix');
  const version = configService.get<string>('app.versioning.version');

  const logger = new Logger();

  app.setGlobalPrefix(globalPrefix);

  if (versionEnable) {
    app.enableVersioning({
      type: VersioningType.URI,
      defaultVersion: version,
      prefix: versionPrefix,
    });
  }

  await swaggerInit(app);

  await app.listen(port, 'localhost');

  logger.log(`Server running on http://localhost:${port}`);
}
bootstrap();
