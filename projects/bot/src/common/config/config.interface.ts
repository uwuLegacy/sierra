import { ClientOptions } from 'discord.js';
import { LogLevel } from '@ogma/common';

export interface ClientConfig extends ClientOptions {}

export interface EnvironmentConfig {
    development: boolean;
    version: string;
    logLevel: string;
}

export interface ISierraConfig {
    application: string;
    owners: string[];

    environment: EnvironmentConfig;
    client: ClientConfig;
}
