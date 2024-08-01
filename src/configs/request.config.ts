import { registerAs } from '@nestjs/config';

export default registerAs(
  'request',
  (): Record<string, any> => ({
    cors: {
      allowMethod: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
      allowOrigin: (process.env.ALLOW_ORIGINS ?? '').split(','),
    },
    throttler: {
      ttl: 60 * 1000, // 1 min
      limit: 1000, // max request per ttl
    },
  })
);
