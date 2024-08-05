import { Injectable, NestMiddleware } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import bodyParser from 'body-parser';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class RequestBodyParserMiddleware implements NestMiddleware {
  private readonly maxFileSize: number;

  constructor(private readonly configService: ConfigService) {
    this.maxFileSize = this.configService.get<number>(
      'request.body.maxFileSize'
    );
  }

  use(req: Request, res: Response, next: NextFunction) {
    bodyParser.json({
      limit: this.maxFileSize,
    })(req, res, next);
  }
}
