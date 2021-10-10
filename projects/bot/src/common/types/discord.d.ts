import { Guild, GuildMember, Message } from 'discord.js';
import { GuildTextBasedChannelTypes } from '@sapphire/discord.js-utilities';
import { ClientService } from 'src/client/client.service';

export interface Message extends Message {
    client: ClientService;
}

export interface GuildMessage extends Message {
    channel: GuildTextBasedChannelTypes;
    readonly guild: Guild;
    readonly member: GuildMember;
}

export interface DMMessage extends Message {
    channel: DMChannel;
    readonly guild: null;
    readonly member: null;
}
