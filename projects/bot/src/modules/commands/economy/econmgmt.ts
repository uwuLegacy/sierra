import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { ApplyOptions } from '@sapphire/decorators';
import { CommandContext, Args, PieceContext } from '@sapphire/framework';
import { Message } from 'src/common/types/discord';
import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { send } from '@sapphire/plugin-editable-commands';

@ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['econadmin', 'ecd', 'ecadm', 'ecad'],
    subCommands: ['add', 'remove', 'set'],
})
@Injectable()
export class EconomyManagementCommand extends SubCommandPluginCommand {
    constructor(
        context: PieceContext,
        private readonly prismaService: PrismaService,
    ) {
        super(context, {});
    }

    public async view(message: Message, args: Args, context: CommandContext) {
        const author = args.finished ? message.author : await args.pick('user');

        const acc = await this.prismaService.account.findUnique({
            where: {
                id: author.id,
            },
        });

        await send(message, `bank: ${acc.bank}, wallet: ${acc.wallet}`);
    }

    public async deposit(
        message: Message,
        args: Args,
        context: CommandContext,
    ) {}

    public async withdraw(
        message: Message,
        args: Args,
        context: CommandContext,
    ) {}
}
