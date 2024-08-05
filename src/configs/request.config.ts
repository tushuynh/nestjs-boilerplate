import { registerAs } from '@nestjs/config';

export default registerAs(
  'request',
  (): Record<string, any> => ({
    cors: {
      allowMethod: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowOrigin: (process.env.ALLOW_ORIGIN ?? '').split(','),
      allowHeader: [
        'Accept',
        'Accept-Language',
        'Content-Language',
        'Content-Type',
        'Origin',
        'Authorization',
        'Access-Control-Request-Method',
        'Access-Control-Request-Headers',
        'Access-Control-Allow-Headers',
        'Access-Control-Allow-Origin',
        'Access-Control-Allow-Methods',
        'Access-Control-Allow-Credentials',
        'Access-Control-Expose-Headers',
        'Access-Control-Max-Age',
        'Referer',
        'Host',
        'X-Requested-With',
        'x-custom-lang',
        'x-timestamp',
        'x-api-key',
        'x-timezone',
        'x-request-id',
        'x-version',
        'x-repo-version',
        'x-permission-token',
        'X-Response-Time',
        'user-agent',
      ],
    },
    throttler: {
      ttl: 60 * 1000, // 1 min
      limit: 300, // max request per ttl
    },
  })
);
