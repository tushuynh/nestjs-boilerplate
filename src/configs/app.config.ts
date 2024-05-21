import { registerAs } from '@nestjs/config';
import { ENUM_APP_ENVIRONMENT } from 'src/app/constants/app.constant';

export default registerAs(
  'app',
  (): Record<string, any> => ({
    name: process.env.APP_NAME ?? 'nest',
    env: process.env.APP_ENV ?? ENUM_APP_ENVIRONMENT.DEVELOPMENT,
    port: parseInt(process.env.PORT) || 3000,

    versioning: {
      enable: process.env.API_VERSIONING_ENABLE === 'true' ?? false,
      prefix: 'v',
      version: process.env.API_VERSION ?? '1',
    },
  })
);
