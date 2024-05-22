import { APP_ENVIRONMENT } from '@app/constants/app.constant';
import { ConfigService } from '@nestjs/config';
import { NestApplication } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

export default async function swaggerInit(app: NestApplication) {
  const configService = app.get(ConfigService);
  const env = configService.get<string>('app.env');

  const docName = configService.get<string>('doc.name');
  const docDesc = configService.get<string>('doc.description');
  const docVersion = configService.get<string>('doc.version');
  const docPrefix = configService.get<string>('doc.prefix');

  if (env !== APP_ENVIRONMENT.PRODUCTION) {
    const documentConfig = new DocumentBuilder()
      .setTitle(docName)
      .setDescription(docDesc)
      .setVersion(docVersion)
      .addTag("API's")
      .addServer('/')
      .addServer('/staging')
      .addServer('/production')
      .build();

    const document = SwaggerModule.createDocument(app, documentConfig);

    SwaggerModule.setup(docPrefix, app, document, {
      explorer: true,
      customSiteTitle: docName,
    });
  }
}
