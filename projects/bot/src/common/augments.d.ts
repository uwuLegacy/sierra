import {} from '@sapphire/framework';

declare module '@sapphire/framework' {
    interface Preconditions {
        AudioEnabled: never;
        Administrator: never;
        BotOwner: never;
        DJ: never;
        Everyone: never;
        Moderator: never;
        ServerOwner: never;
        Spam: never;
    }
}
