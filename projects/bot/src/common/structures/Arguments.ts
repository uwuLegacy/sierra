import {
    Args,
    CommandContext,
    isOk,
    Result,
    UserError,
} from '@sapphire/framework';
import { Message } from 'discord.js';
import type { SierraCommand } from './Command';
import type { Args as LexureArgs } from 'lexure';

export class SierraArgs extends Args {
    public constructor(
        message: Message,
        command: SierraCommand,
        parser: LexureArgs,
        context: CommandContext,
    ) {
        super(message, command, parser, context);
    }

    public nextSplitResult({
        delimiter = ',',
        times = Infinity,
    }: SierraArgs.NextSplitOptions = {}): Result<string[], UserError> {
        if (this.parser.finished) return this.missingArguments();

        const values: string[] = [];
        const parts = this.parser
            .many()
            .reduce((acc, tk) => `${acc}${tk.value}${tk.trailing}`, '')
            .split(delimiter);

        for (const part of parts) {
            const tr = part.trim();
            if (tr.length === 0) continue;

            values.push(tr);
            if (values.length === times) break;
        }

        return values.length > 0 ? Args.ok(values) : this.missingArguments();
    }

    public nextSplit(options?: SierraArgs.NextSplitOptions) {
        const res = this.nextSplitResult(options);
        if (isOk(res)) return res.value;
        throw res.error;
    }
}

export interface SierraArgs {
    command: SierraCommand;
}

export namespace SierraArgs {
    export interface NextSplitOptions {
        delimiter?: string;
        times?: number;
    }
}
