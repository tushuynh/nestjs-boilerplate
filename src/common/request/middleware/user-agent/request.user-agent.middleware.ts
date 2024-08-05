import { RequestApp } from '@common/request/interfaces/request.interface';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Response } from 'express';
import { IResult, UAParser } from 'ua-parser-js';

@Injectable()
export class RequestUserAgentMiddleware implements NestMiddleware {
  use(req: RequestApp, res: Response, next: NextFunction) {
    const parserUserAgent = new UAParser(req['User-Agent']);
    const userAgent: IResult = parserUserAgent.getResult();

    req.__userAgent = userAgent;
    next();
  }
}
