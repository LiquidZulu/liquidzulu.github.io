type slugMap = { [key: string]: Array<string> };
export const invert: slugMap = (o: slugMap) => {
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
