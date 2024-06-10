export function deepCollection(
    collection: {
        id: string;
        slug: string;
        body: string;
        collection: string;
        data: { [key: string]: any };
    }[]
) {
    let layer = {
        files: [],
    };

    for (let item of collection) {
        const split = item.id.split('/');
        if (split.length > 1) {
            const newItem = {
                ...item,
                id: split.slice(1).join('/'),
                slug: split
                    .slice(1)
                    .join('/')
                    .split('.')
                    .slice(0, -1)
                    .join('.'),
            };
            if (!layer[split[0]]) {
                layer[split[0]] = [newItem];
            } else {
                layer[split[0]].push(newItem);
            }
        } else {
            layer.files.push(item);
        }
    }

    const reLayer = {
        files: layer.files,
    };

    for (let [dir, data] of Object.entries(layer).filter(
        ([k, _]) => k != 'files'
    )) {
        reLayer[dir] = deepCollection(data);
    }

    return reLayer;
}
