import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { OgmaModule } from '@ogma/nestjs-module';
import { ClientModule } from 'src/client/client.module';
import { OgmaModuleConfig } from 'src/services/ogma/ogma.config';
import { PrismaService } from 'src/services/prisma/prisma.service';
import config from '../config';

export const AppImports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
        isGlobal: true,
        load: [config],
    }),
    OgmaModule.forRootAsync({
        useClass: OgmaModuleConfig,
        imports: [ConfigModule],
    }),
    PrismaService,
    ClientModule,
];
