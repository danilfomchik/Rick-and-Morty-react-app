export const getPageIntersection = (pages, index) => {
    let startPages = [];
    let intersection = [];
    let endPages = [];

    for (let i = 0; i < pages.length; i++) {
        if (i < 3) {
            startPages.push(pages[i]);
        }
        if (i >= pages.length - 2) {
            endPages.push(pages[i]);
        }
        if (i + 1 === index) {
            intersection.push(pages[i - 1], pages[i], pages[i + 1]);
        }
    }

    // добавить правильное отображение "..."

    return new Set([...startPages, ...intersection, "...", ...endPages]);
};
