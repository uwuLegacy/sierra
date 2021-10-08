import {
    Args,
    Command,
    CommandContext,
    PieceContext,
} from '@sapphire/framework';
import { Message } from 'discord.js';

export default class PingCommand extends Command {
    constructor(ctx: PieceContext) {
        super(ctx, {
            aliases: ['pong'],
            description: 'latency',
        });
    }

    async run(message: Message, args: Args, context: CommandContext) {
        const resp = await message.channel.send('...');
        const lt = resp.createdTimestamp - message.createdTimestamp;
        await resp.edit(`round trip: ${lt}, ws: ${message.client.ws.ping}`);
    }
}
