import { ConsoleLogger, Module } from '@nestjs/common';
import { OgmaModule } from '@ogma/nestjs-module';
import { ClientService } from './client.service';

@Module({
    imports: [OgmaModule.forFeature(ClientService)],
    providers: [ClientService],
    exports: [ClientService],
})
export class ClientModule {}
