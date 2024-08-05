import { RequestApp } from '@common/request/interfaces/request.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NextFunction, Response } from 'express';

@Injectable()
export class RequestVersionMiddleware implements NestMiddleware {
  private readonly versioningEnable: boolean;

  private readonly versioningGlobalPrefix: string;
  private readonly versioningPrefix: string;
  private readonly versioningVersion: string;

  constructor(private readonly configService: ConfigService) {
    this.versioningGlobalPrefix =
      this.configService.get<string>('app.globalPrefix');
    this.versioningEnable = this.configService.get<boolean>(
      'app.versioning.enable'
    );
    this.versioningPrefix = this.configService.get<string>(
      'app.versioning.prefix'
    );
    this.versioningVersion = this.configService.get<string>(
      'app.versioning.version'
    );
  }

  use(req: RequestApp, res: Response, next: NextFunction) {
    const originUrl = req.originalUrl;
    let version = this.versioningVersion;
    if (
      this.versioningEnable &&
      originUrl.startsWith(
        `${this.versioningGlobalPrefix}/${this.versioningPrefix}`
      )
    ) {
      const url = originUrl.split('/');
      version = url[2].replace(this.versioningPrefix, '');
    }

    req.__version = version;
    next();
  }
}
