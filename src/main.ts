import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'path';

async function bootstrap() {
    const app =
        await NestFactory.create<NestExpressApplication>(
            AppModule,
        );

    app.useGlobalPipes(
        new ValidationPipe({
            whitelist: true,
            transform: true,
        }),
    );

    app.enableCors({
        origin: '*',
        //设置为false，表示不使用cookie
        credentials: false,
    });

    app.useStaticAssets(
        join(__dirname, '../uploads'),
        { prefix: '/uploads' },
    );

    await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
