import { LogLevel } from '@ogma/common';
import { Intents } from 'discord.js';
import { ISierraConfig } from './config.interface';
import git from '@nice-labs/git-rev';

const intents = [
    Intents.FLAGS.GUILDS,
    //Intents.FLAGS.GUILD_MEMBERS,
    //Intents.FLAGS.GUILD_BANS,
    //Intents.FLAGS.GUILD_EMOJIS_AND_STICKERS,
    //Intents.FLAGS.GUILD_INTEGRATIONS,
    //Intents.FLAGS.GUILD_WEBHOOKS,
    //Intents.FLAGS.GUILD_INVITES,
    //Intents.FLAGS.GUILD_VOICE_STATES,
    //Intents.FLAGS.GUILD_PRESENCES,
    Intents.FLAGS.GUILD_MESSAGES,
    Intents.FLAGS.GUILD_MESSAGE_REACTIONS,
    Intents.FLAGS.GUILD_MESSAGE_TYPING,
    Intents.FLAGS.DIRECT_MESSAGES,
    Intents.FLAGS.DIRECT_MESSAGE_REACTIONS,
    Intents.FLAGS.DIRECT_MESSAGE_TYPING,
];

const IS_DEVENV = process.env.NODE_ENV !== 'production';
const VERSION = `0.1.0${
    process.env.NODE_ENV !== 'production'
        ? `-dev.${git.commitHash(true, 'HEAD')}` // Go 2 directories up cause this is a monorepo
        : ''
}`;

const config: ISierraConfig = {
    application: 'Sierra',

    environment: {
        development: IS_DEVENV,
        version: VERSION,
        logLevel: IS_DEVENV ? 'VERBOSE' : 'INFO',
    },

    client: {
        intents,
        owners: ['392264789360902156'],
        defaultPrefix: IS_DEVENV ? '$' : ';',

        baseUserDirectory: './src/modules',
        caseInsensitiveCommands: true,
        caseInsensitivePrefixes: true,

        presence: {
            status: 'dnd',
            activities: [
                {
                    type: 'LISTENING',
                    name: `Sierra ${VERSION}`,
                },
            ],
        },
    },
};

export default (): ISierraConfig => config;
