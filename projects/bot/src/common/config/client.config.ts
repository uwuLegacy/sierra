import { ClientOptions } from 'discord.js';

export interface ClientConfig extends ClientOptions {}

export interface EnvironmentConfig {
    development: boolean;
}

export interface ISierraConfig {
    environment: EnvironmentConfig;
    client: ClientConfig;
}
