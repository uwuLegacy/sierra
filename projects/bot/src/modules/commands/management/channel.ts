import { ApplyOptions } from '@sapphire/decorators';
import { Args, CommandContext, UserError } from '@sapphire/framework';
import { send } from '@sapphire/plugin-editable-commands';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { Message, TextChannel } from 'discord.js';
import { Result } from 'lexure';

@ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['channels', 'chnl', 'chl', 'chn'],
    description: 'Manage guild channels through a command-based interface',
    runIn: ['GUILD_ANY'],
    requiredUserPermissions: ['MANAGE_GUILD'],
    subCommands: [
        'add',
        'delete',
        'lock',
        'unlock',
        'lockdown',
        { input: 'create', output: 'add' },
        { input: 'make', output: 'add' },
        { input: 'rm', output: 'delete' },
        { input: 'del', output: 'delete' },
        { input: 'remove', output: 'delete' },
    ],
    flags: ['r', 'remove'],
})
export class ChannelCommand extends SubCommandPluginCommand {
    public async add(message: Message, args: Args, context: CommandContext) {
        try {
            const c = await args.rest('string');
            const cn = await message.guild.channels.create(c);

            if (cn) {
                return send(
                    message,
                    `:white_check_mark: done ${cn.name} [${cn.id}]`,
                );
            }

            return send(message, `:interrobang: failed`);
        } catch (err) {
            return await send(message, `failed ${err}`);
        }
    }

    public async delete(message: Message, args: Args, context: CommandContext) {
        try {
            const c = await args.pick('guildChannel');
            let r = await args.restResult('string');
            let rs = r.success
                ? `${r.value} (Executed by ${message.author.tag} [${message.author.id}])`
                : `No reason provided. (Executed by ${message.author.tag} [${message.author.id}])`;

            await c.delete(rs);

            return send(message, `:white_check_mark: done`);
        } catch (err) {
            return await send(message, `failed ${err}`);
        }
    }

    public async lock(message: Message, args: Args, context: CommandContext) {
        let c: TextChannel;

        // bad but ugh
        if (args.pick('guildTextChannel')) {
            c = await args.pick('guildTextChannel');
        } else {
            // c = message.channel;
        }
    }
}
