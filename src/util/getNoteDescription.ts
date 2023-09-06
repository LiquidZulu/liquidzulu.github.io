import { wikilinksToPlaintext } from './wikilinks';

export const getNoteDescription = (note: string): string => {
    return wikilinksToPlaintext(note.trim());
};
