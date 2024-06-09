import aristotle from 'mcas/test/assets/aristotle.png';
import quotes from 'mcas/test/assets/aristotle.org-quotes';
import { makeQuoteScene } from 'mcas/lib/scenes/quote';
//import { i } from '@internal/lib/util';

// if you want to have multiple possible authors, you need to add their pictures here.
const cardMap = new Map([['aristotle', aristotle]]);

export const quoteScenes = quotes.map((x, i) =>
    makeQuoteScene(cardMap.get(x.author), x, x.citation, `quote-${i}`, {
        bg: true,
    })
);

// you could alternatively manually reference what you want:
//
/* export const quote0 = makeQuoteScene(
 *     aristotle,
 *     quotes[0],
 *     ['Aristotle, "Foo Bar Baz," in id., ', i('Lorem Ipsum'), ', pp. 69-420'],
 *     'quote-0',
 * );
 *
 * export const quote1 = makeQuoteScene(
 *     aristotle,
 *     quotes[1],
 *     ['Aristotle, "Foo Bar Baz," in id., ', i('Lorem Ipsum'), ', pp. 69-420'],
 *     'quote-1',
 * ); */
