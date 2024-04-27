function getTopCommonWords(inputString: string, numWords: number = 10): string {
    // Split the input string into words
    const words: string[] = inputString.split(/\s+/);

    // Create a map to count word occurrences
    const wordCountMap: Map<string, number> = new Map();
    for (const word of words) {
        const cleanedWord: string = word.toLowerCase().replace(/[^a-z]/g, ''); // Remove non-alphabetic characters
        if (cleanedWord) {
            wordCountMap.set(
                cleanedWord,
                (wordCountMap.get(cleanedWord) || 0) + 1
            );
        }
    }

    // Sort word-count pairs by count (descending order)
    const sortedWords: [string, number][] = [...wordCountMap.entries()].sort(
        (a, b) => b[1] - a[1]
    );

    // Get the top N words
    const topWords: string[] = sortedWords
        .slice(0, numWords)
        .map(([word]) => word);

    return topWords.join('');
}
//https://stackoverflow.com/a/32537932
export class Random {
    static N = 624;
    static M = 397;
    static MATRIX_A = 0x9908b0df;
    /* constant vector a */
    static UPPER_MASK = 0x80000000;
    /* most significant w-r bits */
    static LOWER_MASK = 0x7fffffff;
    /* least significant r bits */

    mt = new Array(Random.N);
    /* the array for the state vector */
    mti = Random.N + 1;
    /* mti==N+1 means mt[N] is not initialized */

    constructor(seed: number) {
        this.init_genrand(seed);
    }

    private init_genrand(s: number) {
        this.mt[0] = s >>> 0;
        for (this.mti = 1; this.mti < Random.N; this.mti++) {
            var s = this.mt[this.mti - 1] ^ (this.mt[this.mti - 1] >>> 30);
            this.mt[this.mti] =
                ((((s & 0xffff0000) >>> 16) * 1812433253) << 16) +
                (s & 0x0000ffff) * 1812433253 +
                this.mti;
            /* See Knuth TAOCP Vol2. 3rd Ed. P.106 for multiplier. */
            /* In the previous versions, MSBs of the seed affect   */
            /* only MSBs of the array mt[].                        */
            /* 2002/01/09 modified by Makoto Matsumoto             */
            this.mt[this.mti] >>>= 0;
            /* for >32 bit machines */
        }
    }

    /**
     * generates a random number on [0,0xffffffff]-interval
     * @private
     */
    private _nextInt32(): number {
        var y: number;
        var mag01 = new Array(0x0, Random.MATRIX_A);
        /* mag01[x] = x * MATRIX_A  for x=0,1 */

        if (this.mti >= Random.N) {
            /* generate N words at one time */
            var kk: number;

            if (this.mti == Random.N + 1)
                /* if init_genrand() has not been called, */
                this.init_genrand(5489);
            /* a default initial seed is used */

            for (kk = 0; kk < Random.N - Random.M; kk++) {
                y =
                    (this.mt[kk] & Random.UPPER_MASK) |
                    (this.mt[kk + 1] & Random.LOWER_MASK);
                this.mt[kk] =
                    this.mt[kk + Random.M] ^ (y >>> 1) ^ mag01[y & 0x1];
            }
            for (; kk < Random.N - 1; kk++) {
                y =
                    (this.mt[kk] & Random.UPPER_MASK) |
                    (this.mt[kk + 1] & Random.LOWER_MASK);
                this.mt[kk] =
                    this.mt[kk + (Random.M - Random.N)] ^
                    (y >>> 1) ^
                    mag01[y & 0x1];
            }
            y =
                (this.mt[Random.N - 1] & Random.UPPER_MASK) |
                (this.mt[0] & Random.LOWER_MASK);
            this.mt[Random.N - 1] =
                this.mt[Random.M - 1] ^ (y >>> 1) ^ mag01[y & 0x1];

            this.mti = 0;
        }

        y = this.mt[this.mti++];

        /* Tempering */
        y ^= y >>> 11;
        y ^= (y << 7) & 0x9d2c5680;
        y ^= (y << 15) & 0xefc60000;
        y ^= y >>> 18;

        return y >>> 0;
    }

    /**
     * generates an int32 pseudo random number
     * @param range: an optional [from, to] range, if not specified the result will be in range [0,0xffffffff]
     * @return {number}
     */
    nextInt32(): number {
        var result = this._nextInt32();
        return result;
    }
}

function numToHash(seed: number, length: number) {
    const characters =
        'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const random = new Random(seed);
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(random.nextInt32() * 1000000);
        result += characters.charAt(randomIndex % characters.length);
    }
    return result;
}
const hasher = (x: string) => {
    var hash = 0,
        i,
        chr;
    if (x.length === 0) return hash;
    for (i = 0; i < x.length; i++) {
        chr = x.charCodeAt(i);
        hash = (hash << 5) - hash + chr;
        hash |= 0; // Convert to 32bit integer
    }
    return hash;
};
export const paragraphRegex = (node: Element) => {
    if (node.children && node.tagName == 'p') {
        let text = '';
        node.children.forEach(child => {
            if (child.type === 'text') {
                text += child.value;
            }
        });
        node.properties.id = numToHash(hasher(getTopCommonWords(text)), 8);
    }
};
