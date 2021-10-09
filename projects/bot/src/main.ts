import './client/setup';

import { NestFactory } from '@nestjs/core';
import { OgmaService } from '@ogma/nestjs-module';
import { AppModule } from './app.module';
import { ClientService } from './client/client.service';
import { PrismaService } from './services/prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule, {
        bufferLogs: true,
    });

    const logger: OgmaService = app.get<OgmaService>(OgmaService);
    app.useLogger(logger);

    const prisma: PrismaService = app.get(PrismaService);
    prisma.enableShutdownHooks(app);

    const client: ClientService = app.get(ClientService);
    client.start();
}

bootstrap();
