import { send } from '@sapphire/plugin-editable-commands';
import { ApplyOptions } from '@sapphire/decorators';
import { Message } from 'discord.js';
import { SierraCommand } from 'src/common/structures/Command';

ApplyOptions<SierraCommand.Options>({
    aliases: ['latency'],
    description: 'Gets latency',
    detailedDescription: 'Get the bot latency',
});
export class PingCommand extends SierraCommand {
    public async run(
        message: Message,
        args: SierraCommand.Args,
        context: SierraCommand.Context,
    ) {
        const m = await send(message, 'pinging...');
        m.edit(
            `roundtrip: ${m.editedTimestamp - m.createdTimestamp}ms, ws: ${
                message.client.ws.ping
            }ms`,
        );
    }
}
