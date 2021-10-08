import { ClientOptions } from 'discord.js';
import { LogLevel } from '@ogma/common';

export interface ClientConfig extends ClientOptions {
    owners: string[];
}

export interface EnvironmentConfig {
    development: boolean;
    version: string;
    logLevel: string;
}

export interface ISierraConfig {
    application: string;

    environment: EnvironmentConfig;
    client: ClientConfig;
}
