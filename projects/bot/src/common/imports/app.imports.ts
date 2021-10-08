import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from 'src/client/client.module';
import { PrismaService } from 'src/services/prisma/prisma.service';
import config from '../config';

export const AppImports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [config],
    }),
    PrismaService,
    ClientModule,
];
