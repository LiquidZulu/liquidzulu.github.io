// [hours, minutes, seconds, ms]
type THours = number;
type TMinutes = number;
type TSeconds = number;
type TMilliseconds = number;
type TReadTimeCalculator = (
    text: string
) => [THours, TMinutes, TSeconds, TMilliseconds];

const pluralise = (num: number, unit: string): string => {
    if (num !== 1) return `${num} ${unit}s`;
    return `${num} ${unit}`;
};

export const readTimeMins: TReadTimeCalculator = t => {
    /*
     * this number is by no means accurate, the
     * real number is closer to 180-200 for the
     * average WPM. But this number needs to be
     * adjusted to account for all of the other
     * shit present in the html, 240 leads to a
     * little bit over how long it takes me to
     * read, which I think will be fine for first
     * time readers and will be closer to what
     * people unfamiliar with the topic might
     * expect.
     */
    const WPM = 240;
    const charsPerWord = 5;
    return [0, t.length / charsPerWord / WPM, 0, 0];
};

export const readTimeReadable = (
    readTimeCalculator: TReadTimeCalculator,
    text: string
) => {
    // input times (they might not be integers!)
    const [iHours, iMins, iSecs, iMs] = readTimeCalculator(text);
    const totalMs =
        iHours * 60 * 60 * 1000 + iMins * 60 * 1000 + iSecs * 1000 + iMs;

    const [tHours, tMins, tSecs, tMs] = [
        totalMs / (1000 * 60 * 60),
        totalMs / (1000 * 60),
        totalMs / 1000,
        totalMs,
    ];

    if (tMs < 1000) return `${Math.round(tMs)} ms`;
    if (tSecs < 60) return pluralise(Math.round(tSecs), 'second');
    if (tMins < 60) return pluralise(Math.round(tMins), 'minute');

    const [hours, minutes] = [
        Math.floor(tHours),
        Math.round((tHours - Math.floor(tHours)) * 60),
    ];

    // I feel like 1 hour, 2 minutes is a little weird, needs to be a decent few minutes, I choose 10 mins as my cutoff
    if (minutes >= 10)
        return `${pluralise(hours, 'hour')}, ${pluralise(minutes, 'minute')}`;
    return pluralise(Math.round(tHours), 'hour');
};
