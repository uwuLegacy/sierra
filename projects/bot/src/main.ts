import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ClientService } from './client/client.service';
import { PrismaService } from './services/prisma/prisma.service';

async function bootstrap() {
    const app = await NestFactory.createApplicationContext(AppModule);

    const prisma: PrismaService = app.get(PrismaService);
    prisma.enableShutdownHooks(app);

    const client: ClientService = app.get(ClientService);
    client.start();
}

bootstrap();
