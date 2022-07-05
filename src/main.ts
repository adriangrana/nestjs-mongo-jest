import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  
  const app = await NestFactory.create(AppModule);
  await app.listen(3001)
  console.log('Application is running on: 3001');
  console.log(process.env.GREETING_MSG);
  
}
bootstrap();
