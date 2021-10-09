import { GuildMember, Permissions } from 'discord.js';

export function isGuildOwner(member: GuildMember) {
    return member.id === member.guild.id;
}

export function isAdmin(member: GuildMember) {
    return isGuildOwner(member) || checkAdministrator(member);
}

export function isMod(member: GuildMember) {
    return isGuildOwner(member) || checkModerator(member);
}

function checkModerator(member: GuildMember) {
    return member.permissions.has(Permissions.FLAGS.MANAGE_GUILD);
}

function checkAdministrator(member: GuildMember) {
    return member.permissions.has(Permissions.FLAGS.ADMINISTRATOR);
}
