export const modClass = (
    element: HTMLElement,
    add: string[],
    remove: string[]
) => {
    [
        ['add', add],
        ['remove', remove],
    ].forEach(([m, classlist]: any) => {
        // shut up TS, forEach does in fact exist here
        classlist.forEach((c: any) => {
            element.classList[m as any as 'add' | 'remove'](c);
        });
    });
};
