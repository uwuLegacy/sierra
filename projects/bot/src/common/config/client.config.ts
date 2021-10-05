import { ClientOptions } from 'discord.js';

export interface ClientConfig extends ClientOptions {}

export interface ISierraConfig {
    client: ClientConfig;
}
