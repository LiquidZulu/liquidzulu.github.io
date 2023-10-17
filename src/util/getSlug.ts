export const getSlug = (str: string): string =>
    str
        .toLowerCase()
        .replaceAll(' ', '-')
        .replaceAll(/[^a-z0-9\-]+/g, '');
// .toLowerCase()
// .replace(/[^a-z0-9]+/g, '-')
// .replace(/(^-|-$)+/g, '');
