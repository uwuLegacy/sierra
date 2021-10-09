import { Injectable } from '@nestjs/common';
import { Events, Listener, PieceContext } from '@sapphire/framework';
import { Guild } from 'discord.js';
import { PrismaService } from 'src/services/prisma/prisma.service';

@Injectable()
export class ClientListener extends Listener<typeof Events.GuildCreate> {
    constructor(
        context: PieceContext,
        private readonly prismaService: PrismaService,
    ) {
        super(context);
    }

    run(guild: Guild) {
        this.prismaService.guildEntity.create({
            data: {
                id: guild.id,
            },
        });
    }
}
