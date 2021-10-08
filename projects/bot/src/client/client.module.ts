import { ConsoleLogger, Module } from '@nestjs/common';
import { ClientService } from './client.service';

@Module({
    providers: [ClientService, ConsoleLogger],
    exports: [ClientService],
})
export class ClientModule {}
