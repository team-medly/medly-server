import { NestFactory } from '@nestjs/core';
import * as fs from 'fs';

import { AppModule } from './app.module';
import { setSwagger } from './common/utils/setSwagger';

async function bootstrap() {
  const isProd = process.env.DB_DATABASE !== 'medly_local';

  const app = isProd
    ? await NestFactory.create(AppModule, {
        httpsOptions: {
          key: fs.readFileSync(process.env.LETS_ENCRYPT_PRIVKEY_PATH),
          cert: fs.readFileSync(process.env.LETS_ENCRYPT_FULLCHAIN_PATH),
        },
      })
    : await NestFactory.create(AppModule);

  setSwagger(app);

  await app.listen(process.env.SERVER_PORT);
}
bootstrap();
