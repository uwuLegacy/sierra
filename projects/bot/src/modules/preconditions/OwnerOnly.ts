import {
    Args,
    Command,
    Precondition,
    PreconditionContext,
    PreconditionResult,
} from '@sapphire/framework';
import { Message } from 'discord.js';
import { config } from 'src/common/config';

export class ClientPrecondition extends Precondition {
    public run(
        message: Message,
        command: Command<Args>,
        context: PreconditionContext,
    ): PreconditionResult {
        return config.owners.includes(message.author.id)
            ? this.ok()
            : this.error({
                  message: 'insufficient privileges.',
              });
    }
}

declare module '@sapphire/framework' {
    interface Preconditions {
        OwnerOnly: never;
    }
}
