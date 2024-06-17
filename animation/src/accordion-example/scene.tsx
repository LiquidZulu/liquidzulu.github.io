import { makeScene2D } from '@motion-canvas/2d';
import { all, waitFor, createRefArray } from '@motion-canvas/core';
import { colors, McasTxt as Txt } from 'mcas/lib';
import { Accordion, AccordionItem } from 'mcas/lib/components/Accordion';

export default makeScene2D(function* (view) {
    view.fill(colors.bg);

    const items = createRefArray<AccordionItem>();

    view.add(
        <Accordion width={640}>
            <AccordionItem ref={items} title="Accordion item 1" isOpen>
                <Txt
                    fontFamily={`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`}
                    fill="white">
                    Accordion content arbitrary {'\n'}blah blah blah blah blah
                    blah {'\n'}blah blah
                </Txt>
            </AccordionItem>
            <AccordionItem ref={items} title="Accordion item 2">
                <Txt
                    fontFamily={`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`}
                    fill="white">
                    Accordion content arbitrary {'\n'}blah blah blah blah blah
                    blah {'\n'}blah blah
                </Txt>
            </AccordionItem>
            <AccordionItem ref={items} title="Accordion item 3">
                <Txt
                    fontFamily={`ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"`}
                    fill="white">
                    Accordion content arbitrary {'\n'}blah blah blah blah blah
                    blah {'\n'}blah blah
                </Txt>
            </AccordionItem>
        </Accordion>
    );

    yield* all(items[1].open(), items[0].close());
    yield* waitFor(1);
    yield* all(items[1].close(), items[0].open());
    yield* waitFor(1);
});
