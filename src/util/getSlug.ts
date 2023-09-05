export const getSlug = (str: string): string =>
    str.toLowerCase().replaceAll(' ', '-');
