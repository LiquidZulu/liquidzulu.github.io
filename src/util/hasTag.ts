export const hasTag = (tags: string | string[], tag: string) => {
    try {
        // @ts-ignore
        return tags.includes(tag);
    } catch (e) {
        return tags == tag;
    }
};
