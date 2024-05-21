import { registerAs } from '@nestjs/config';

export default registerAs(
  'database',
  (): Record<string, any> => ({
    host: process.env?.DATABASE_HOST ?? '',
    name: process.env?.DATABASE_NAME ?? 'nest',
    user: process.env?.DATABASE_USER,
    password: process.env?.DATABASE_PASSWORD,
  })
);
