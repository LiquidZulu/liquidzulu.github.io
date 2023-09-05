export const regexReplace = (
    str: string,
    regex: RegExp,
    replacer: (x: string) => string
): string => {
    let newStr = str;
    const matches = str.match(regex);

    for (let match of matches) {
        newStr = newStr.replace(match, replacer(match));
    }

    return newStr;
};
