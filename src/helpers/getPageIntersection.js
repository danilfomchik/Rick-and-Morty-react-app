export const getPageIntersection = (pages, currentPage) => {
    let startPages = [pages[0], pages[1], pages[2]];
    let intersection = [];
    let endPages = [pages[pages.length - 2], pages[pages.length - 1]];

    for (let i = 0; i < pages.length; i++) {
        if (i + 1 === currentPage) {
            intersection.push(pages[i - 1], pages[i], pages[i + 1]);
        }
    }

    return new Set([...startPages, ...intersection, ...endPages]);
};
