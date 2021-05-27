export const tools = {
    hue: {
        shift: (h, s) => {
            h += s
            while (h >= 360.0) h -= 360.0
            while (h < 0.0) h += 360.0
            return h
        },
    },
}
