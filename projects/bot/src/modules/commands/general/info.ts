import { ApplyOptions } from '@sapphire/decorators';
import { version } from '@sapphire/framework';
import { Message, MessageEmbed } from 'discord.js';
import { VERSION } from 'src/common/config';
import { SierraCommand } from 'src/common/structures/Command';
import { cutText } from '@sapphire/utilities';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['information'],
    description: 'Information about the bot',
    detailedDescription: 'Get information about the bot',
})
export class InfoCommand extends SubCommandPluginCommand {
    public async run(
        message: Message,
        args: SierraCommand.Args,
        context: SierraCommand.Context,
    ) {
        const embed = new MessageEmbed()
            .setTitle('Information')
            .setColor('RANDOM')
            .setDescription(
                cutText(
                    [
                        `Sierra v${VERSION}`,
                        'A minimalistic Discord bot for server administration',
                        '',
                        'https://github.com/uwuLegacy/sierra',
                        `Running Node.JS ${process.version}, Sapphire ${version}`,
                    ]
                        .filter((p) => p !== undefined)
                        .join('\n'),
                    2000,
                ),
            );

        return send(message, { embeds: [embed] });
    }
}
