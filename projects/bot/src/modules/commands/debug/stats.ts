import { ApplyOptions } from '@sapphire/decorators';
import { Args } from '@sapphire/framework';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { roundNumber } from '@sapphire/utilities';
import { MessageEmbed } from 'discord.js';
import { cpus, CpuInfo } from 'os';
import { send } from '@sapphire/plugin-editable-commands';
import { Message } from 'src/common/types/discord';
import ms from 'ms';
import { concat } from 'src/common/util/functions/strings';

@ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['stats', 'sts'],
    description: 'Bot stats',
    requiredClientPermissions: ['EMBED_LINKS'],
})
export class UserCommand extends SubCommandPluginCommand {
    public async run(message: Message, args: Args) {
        const embed = await this.buildEmbed(message, args);
        return send(message, { embeds: [embed] });
    }

    private async buildEmbed(message: Message, args: Args) {
        return new MessageEmbed()
            .setColor('RANDOM')
            .addField(
                'Stats',
                concat(
                    [
                        `Guilds: ${this.generalStatistics.guilds}`,
                        `Users:${this.generalStatistics.users}`,
                        `Channels: ${this.generalStatistics.channels}`,
                        `Uptime: ${this.uptimeStatistics(message)}`,
                    ],
                    2000,
                ),
            )
            .addField(
                'Usage',
                concat(
                    [
                        `CPU: ${this.usageStatistics.cpuLoad}`,
                        `Memory: ${this.usageStatistics.ramUsed} MB / ${this.usageStatistics.ramTotal} MB`,
                    ],
                    2000,
                ),
            );
    }

    private get generalStatistics(): StatsGeneral {
        const { client } = this.container;
        return {
            channels: client.channels.cache.size,
            guilds: client.guilds.cache.size,
            nodeJs: process.version,
            users: client.guilds.cache.reduce(
                (acc, val) => acc + (val.memberCount ?? 0),
                0,
            ),
        };
    }

    private uptimeStatistics(message: Message): string {
        return ms(message.client.uptime);
    }

    private get usageStatistics(): StatsUsage {
        const usage = process.memoryUsage();
        return {
            cpuLoad: cpus()
                .map(UserCommand.formatCpuInfo.bind(null))
                .join(' | '),
            ramTotal: roundNumber(usage.heapTotal / 1048576),
            ramUsed: roundNumber(usage.heapUsed / 1048576),
        };
    }

    private static formatCpuInfo({ times }: CpuInfo) {
        return `${
            roundNumber(
                ((times.user + times.nice + times.sys + times.irq) /
                    times.idle) *
                    10000,
            ) / 100
        }%`;
    }
}

export interface StatsGeneral {
    channels: number;
    guilds: number;
    nodeJs: string;
    users: number;
}

export interface StatsUsage {
    cpuLoad: string;
    ramTotal: number;
    ramUsed: number;
}
