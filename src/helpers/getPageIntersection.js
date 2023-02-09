// сделать кастомным хуком

export const getPageIntersection = (pages, index) => {
    let startPages = [];
    let intersection = [];
    let endPages = [];

    // let startPages = [pages[0], pages[1]];
    // let endPages = [pages[pages.length - 2], pages[pages.length - 1]];

    for (let i = 0; i < pages.length; i++) {
        if (i + 1 === index) {
            intersection.push(pages[i - 1], pages[i], pages[i + 1]);

            // ---
            // if (!intersection.some((el) => [pages[0], pages[1]].includes(el))) {
            //     startPages.push([pages[0], pages[1]]);
            // } else if (
            //     !intersection.some((el) =>
            //         [pages[pages.length - 2], pages[pages.length - 1]].includes(
            //             el
            //         )
            //     )
            // ) {
            //     endPages.push([
            //         pages[pages.length - 2],
            //         pages[pages.length - 1],
            //     ]);
            // }
            // ---
        }
    }

    // подшатать

    return [...startPages, intersection, ...endPages];
};

// &&
// !startPages.some((el) =>
//     [pages[i - 1], pages[i], pages[i + 1]].includes(el)
// ) &&
// !endPages.some((el) =>
//     [pages[i - 1], pages[i], pages[i + 1]].includes(el)
// )
