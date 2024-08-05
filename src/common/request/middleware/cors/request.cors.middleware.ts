import { APP_ENVIRONMENT } from '@app/constants/app.constant';
import { HttpStatus, Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import cors, { CorsOptions } from 'cors';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestCorsMiddleware implements NestMiddleware {
  private readonly appEnv: APP_ENVIRONMENT;
  private readonly allowOrigin: string | boolean | string[];
  private readonly allowMethod: string[];
  private readonly allowHeader: string[];

  constructor(private readonly configService: ConfigService) {
    this.appEnv = this.configService.get('app.env');
    this.allowOrigin = this.configService.get<string | boolean | string[]>(
      'request.cors.allowOrigin'
    );
    this.allowMethod = this.configService.get<string[]>(
      'request.cors.allowMethod'
    );
    this.allowHeader = this.configService.get<string[]>(
      'request.cors.allowHeader'
    );
  }

  use(req: Request, res: Response, next: NextFunction) {
    const allowOrigin =
      this.appEnv === APP_ENVIRONMENT.PRODUCTION ? this.allowHeader : '*';

    const corsOption: CorsOptions = {
      origin: allowOrigin,
      methods: this.allowMethod,
      allowedHeaders: this.allowHeader,
      preflightContinue: false,
      credentials: true,
      optionsSuccessStatus: HttpStatus.NO_CONTENT,
    };

    cors(corsOption)(req, res, next);
  }
}
