import { ModuleMetadata } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientModule } from 'src/client/client.module';

export const AppImports: ModuleMetadata['imports'] = [
    ConfigModule.forRoot({
        isGlobal: true,
    }),
    ClientModule,
];
