import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MongooseExceptionFilter } from './filters/mongoose-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  console.log(new MongooseExceptionFilter());
  app.useGlobalFilters(new MongooseExceptionFilter());
  await app.listen(8000);
}
bootstrap();
