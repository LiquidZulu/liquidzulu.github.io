export const regexReplace = (
    str: string,
    regex: RegExp,
    replacer: (x: string) => string
): string => {
    try {
        let newStr = str;
        const matches = str.match(regex);

        for (let match of matches) {
            newStr = newStr.replace(match, replacer(match));
        }

        return newStr;
    } catch (e) {
        return str;
    }
};
