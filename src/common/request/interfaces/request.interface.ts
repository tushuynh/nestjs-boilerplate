import { Request } from 'express';
import { IResult } from 'ua-parser-js';

export interface RequestApp extends Request {
  __version: string;
  __userAgent: IResult;
}
