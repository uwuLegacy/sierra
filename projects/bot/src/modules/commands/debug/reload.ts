import { ApplyOptions } from '@sapphire/decorators';
import { Args, Piece, Store } from '@sapphire/framework';
import { SubCommandPluginCommand } from '@sapphire/plugin-subcommands';
import { send } from '@sapphire/plugin-editable-commands';
import { Message } from 'src/common/types/discord';
import { Stopwatch } from '@sapphire/stopwatch';
import { ClientService } from 'src/client/client.service';

@ApplyOptions<SubCommandPluginCommand.Options>({
    aliases: ['rld', 'r'],
    description: 'Reloads client modules',
    preconditions: ['OwnerOnly'],
})
export class ReloadCommand extends SubCommandPluginCommand {
    public async run(message: Message, args: Args) {
        const content = await this._reload(message, args);
        return send(message, content);
    }

    private async _reload(message: Message, args: Args) {
        const everything = await args.pickResult(ReloadCommand.everything);
        if (everything.success) return this.reloadEverything(message.client);

        const store = await args.pickResult('')
    }

    private async reloadStore(store: Store<Piece>): Promise<string> {
        const timer = new Stopwatch();
        await store.loadAll();

        return `Reloaded store ${store.name} in ${timer.stop().toString()}.`;
    }

    private async reloadPiece(piece: Piece): Promise<string> {
        const timer = new Stopwatch();
        await piece.reload();
        const type = piece.store.name.slice(0, -1);

        return `Reloaded ${type}:${piece.name} in ${timer.stop().toString()}.`;
    }

    private async reloadEverything(client: ClientService): Promise<string> {
        const timer = new Stopwatch();

        await Promise.all([
            ...[...client.stores.values()].map(async (store) => {
                await store.loadAll();
            }),
        ]);

        return `Reloaded everything in ${timer.stop().toString()}.`;
    }

    private static everything = Args.make((parameter, { argument }) => {
        if (parameter.toLowerCase() === 'everything')
            return Args.ok('everything');
        return Args.error({
            parameter,
            argument,
            identifier: 'Argument error ',
        });
    });
}
