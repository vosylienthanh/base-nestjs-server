import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { GlobalDBErrorFilter } from './common/filters/global-db-error.filter';
import { configService } from './modules/config/config.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: '*',
  });
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
  app.useGlobalFilters(new GlobalDBErrorFilter());

  if (configService.IS_DEVELOPMENT_MODE) {
    // TODO: Replace with <Service name>
    const config = new DocumentBuilder()
      .setTitle('<Service name>')
      .setDescription('<Service name> API description')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('docs', app, documentFactory);
  }
  await app.listen(configService.PORT);
}
bootstrap();
