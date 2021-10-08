import { Events, Listener } from '@sapphire/framework';
import { Client } from 'discord.js';
import { ClientService } from 'src/client/client.service';

export class ClientListener extends Listener<typeof Events.ClientReady> {
    run(client: ClientService) {
        client.consoleLogger.log(
            `Client ready, logged in as ${client.user.tag} (${client.user.id})`,
        );
    }
}
