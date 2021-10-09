import { send } from '@sapphire/plugin-editable-commands';
import { ApplyOptions } from '@sapphire/decorators';
import { Message } from 'discord.js';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { Args, CommandContext } from '@sapphire/framework';

ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['latency'],
    description: 'Gets latency',
    detailedDescription: 'Get the bot latency',
});
export class PingCommand extends SubCommandPluginCommand {
    public async run(message: Message, args: Args, context: CommandContext) {
        const m = await send(message, 'pinging...');
        m.edit(
            `roundtrip: ${m.editedTimestamp - m.createdTimestamp}ms, ws: ${
                message.client.ws.ping
            }ms`,
        );
    }
}
