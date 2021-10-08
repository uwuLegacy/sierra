import { ConsoleLogger, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Enumerable } from '@sapphire/decorators';
import { SapphireClient } from '@sapphire/framework';
import { ClientConfig } from 'src/common/config/client.config';

@Injectable()
export class ClientService extends SapphireClient {
    @Enumerable(false)
    public __dev__ =
        process.env.NODE_ENV !== 'production' ||
        this.configService.get<boolean>('client.environment.development');

    public constructor(
        private readonly configService: ConfigService,
        private readonly consoleLogger: ConsoleLogger,
    ) {
        super(configService.get<ClientConfig>('client'));
        this.consoleLogger.setContext('ClientService');

        this.consoleLogger.log('Client instantiated');
    }

    public async start() {
        const lr = await super.login();

        this.consoleLogger.log('Client initialized');
        return lr;
    }

    public async destroy() {
        this.consoleLogger.warn('Destroying client instance');
        return super.destroy();
    }

    public build() {}
}
