export const paginationPrevNext = (
    a: Array<string>,
    e: string
): [string, string] => {
    const index = a.findIndex(x => x === e);

    switch (index) {
        case a.length - 1:
            return [a[index - 1], a[0]];
        case 0:
            return [a[a.length - 1], a[1]];
        default:
            return [a[index - 1], a[index + 1]];
    }
};
