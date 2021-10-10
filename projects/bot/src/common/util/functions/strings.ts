import { isNullOrUndefinedOrZero } from '@sapphire/utilities';

export function concat(
    strs: string[],
    lim: number,
    sep: string = '\n',
): string {
    let out = strs.filter((p) => p !== undefined).join(sep);
    if (!isNullOrUndefinedOrZero(lim) || out.length > lim) {
        out.slice(0, lim - 3);

        return out;
    }

    return out;
}
