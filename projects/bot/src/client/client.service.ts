import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Enumerable } from '@sapphire/decorators';
import { SapphireClient, Store } from '@sapphire/framework';
import { ClientConfig } from 'src/common/config/config.interface';
import '@sapphire/pieces';
import { OgmaLogger, OgmaService } from '@ogma/nestjs-module';

@Injectable()
export class ClientService extends SapphireClient {
    public constructor(
        private readonly configService: ConfigService,
        @OgmaLogger(ClientService) public readonly consoleLogger: OgmaService,
    ) {
        super(configService.get<ClientConfig>('client'));

        Store.defaultStrategy.onLoad = (s, p) =>
            this.consoleLogger.log(
                `Loading ${s.name}:${p.name}`,
                'LoaderService',
            );

        this.consoleLogger.log('Client instantiated', 'ClientService');
    }

    @Enumerable(false)
    public __dev__ =
        process.env.NODE_ENV !== 'production' ||
        this.configService.get<boolean>('environment.development');

    public async start() {
        const lr = await super.login(process.env.AUTHORIZATION);

        this.consoleLogger.log('Client initialized', 'ClientService');
        return lr;
    }

    public async destroy() {
        this.consoleLogger.warn('Destroying client instance', 'ClientService');
        return super.destroy();
    }
}
