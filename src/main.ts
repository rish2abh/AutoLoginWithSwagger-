import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, UnprocessableEntityException, ValidationPipe } from '@nestjs/common';
import * as figlet from 'figlet'
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
const chalk = require("chalk");

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

   //Swagger implementation 
   const config = new DocumentBuilder().addBearerAuth()
   .setTitle('TraceNet')
   .setDescription(`A TraceNet's api`)
   .setVersion('1.0')
   .build();
 const document = SwaggerModule.createDocument(app, config);
 SwaggerModule.setup('api-doc', app, document);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      exceptionFactory: (errors) => {
        return new UnprocessableEntityException({
          success:false,
          error: 'Unprocessable Entity',
          message: errors.map(item => Object.values(item.constraints)[0]),
        });
      },
    }),
  );
  await app.listen(process.env.PORT_LOCAL);

  const logger = new Logger()
  logger.log(`😼======================================================== 😼`);
  logger.log(`Environment Variable`, 'NestApplication');
  logger.log(`😼======================================================== 😼`);
  logger.log(
    `Http Server running on http://localhost:${process.env.PORT_LOCAL} 🚀`,
    'NestApplication'
  );
  logger.log(`Database uri ${process.env.MONGODB_LOCAL_URL} 🚀`, 'NestApplication');
  logger.log(`😼 ======================================================== 😼`);
  
  figlet.text("Black Mirror",{font: "3D-ASCII"},
    function (err, data) {
      if (err) {
        console.log("Something went wrong...");
        console.dir(err);
        return;
      }
      console.log(chalk.greenBright(data));
    }
  );
}
bootstrap();
