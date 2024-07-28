import { regexReplaceAsync } from './regexReplace';
import { getSubs } from './yt';
import { Innertube } from 'youtubei.js';

const yt = await Innertube.create();

export const parse = async (t: string): Promise<string> =>
    regexReplaceAsync(t, /\{.+\}/g, async i => {
        const [tag, data] = i.slice(1, -1).split(':');

        switch (tag) {
            case 'subs':
                return await getSubs(await yt.getChannel(data));

            default:
                return i;
        }
    });
