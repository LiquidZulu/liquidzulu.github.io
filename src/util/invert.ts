type slugMap = { [key: string]: Array<string> };
export const invert = (o: slugMap): slugMap => {
    let newO: slugMap = {};
    for (let [k, v] of Object.entries(o)) {
        for (let i of v) {
            if (i in newO) {
                newO[i].push[k];
            } else {
                newO[i] = k;
            }
        }
    }
    return newO;
};

export const invertLinks = (links: {
    [key: string]: string[];
}): { [key: string]: string[] } => {
    let inverseLinks = {};

    for (let [k, vs] of Object.entries(links)) {
        for (let v of vs) {
            inverseLinks[v] == undefined
                ? (inverseLinks[v] = [k])
                : inverseLinks[v].push(k);
        }
    }

    return inverseLinks;
};
