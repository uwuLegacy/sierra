import { OgmaService } from '@ogma/nestjs-module';
import { ApplyOptions } from '@sapphire/decorators';
import { Args, PieceContext } from '@sapphire/framework';
import {
    SubCommandPluginCommand,
    SubCommandPluginCommandOptions,
} from '@sapphire/plugin-subcommands';
import { Message } from 'discord.js';
import { Type } from '@sapphire/type';
import { codeBlock, isThenable } from '@sapphire/utilities';
import { inspect } from 'util';
import { send } from '@sapphire/plugin-editable-commands';
import { PrismaService } from 'src/services/prisma/prisma.service';
import { Inject, Injectable } from '@nestjs/common';

@ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['run', 'exec'],
    description: 'Evaluate JS code',
    preconditions: ['OwnerOnly'],
    flags: ['async', 'hidden', 'silent', 's', 'showHidden'],
    options: ['depth'],
})
export class EvalCommand extends SubCommandPluginCommand {
    constructor(
        context: PieceContext,
        options: SubCommandPluginCommandOptions,
        private readonly loggerService: OgmaService,
    ) {
        super(context, options);
    }

    public async run(message: Message, args: Args) {
        const code = await args.rest('string');

        const { result, success, type } = await this.eval(message, code, {
            async: args.getFlags('async'),
            depth: Number(args.getOption('depth')) ?? 0,
            showHidden: args.getFlags('hidden', 'showHidden'),
        });

        const output = success
            ? codeBlock('js', result)
            : `**Err:** ${codeBlock('bash', result)}`;
        if (args.getFlags('silent', 's')) return null;

        const typeFooter = `**Type:** ${codeBlock('typescript', type)}`;

        if (output.length > 2000) {
            return send(message, {
                content: `Output exceeds 2000 characters, result sent as file\n\n${typeFooter}`,
                files: [
                    { attachment: Buffer.from(output), name: 'eval-result.js' },
                ],
            });
        }

        return send(message, `${output}\n${typeFooter}`);
    }

    private async eval(
        message: Message,
        code: string,
        flags: { async: boolean; depth: number; showHidden: boolean },
    ) {
        if (flags.async) code = `(async () => {\n${code}\b})();`;

        // Placeholders for evaluation
        const msg = message;
        const client = message.client;
        const logger = this.loggerService;

        let success = true;
        let result = null;

        try {
            result = eval(code);
        } catch (err) {
            if (err && err instanceof Error && err.stack) {
                this.loggerService.error(
                    `Evaluation error! ${err.message}`,
                    err.stack,
                    'EvaluationCommand',
                );

                result = err;
                success = false;
            }
        }

        const type = new Type(result).toString();
        if (isThenable(result)) result = await result;

        if (typeof result !== 'string') {
            result = inspect(result, {
                depth: flags.depth,
                showHidden: flags.showHidden,
            });
        }

        return { result, success, type };
    }
}
