import { Events, Listener } from '@sapphire/framework';
import { ClientService } from 'src/client/client.service';

export class ClientListener extends Listener<typeof Events.ClientReady> {
    // Funny hack, the run method for this listener passes a client instance
    // The instance in this case is guaranteed to be a ClientService and not just a Client
    // So we can just use the ClientService logger without injecting a client or logger
    run(client: ClientService) {
        client.consoleLogger.log(
            `Client ready, logged in as ${client.user.tag} (${client.user.id})`,
        );
    }
}
