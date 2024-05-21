import { registerAs } from '@nestjs/config';

export default registerAs(
  'request',
  (): Record<string, any> => ({
    cors: {
      allowMethod: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE'],
    },
  })
);
