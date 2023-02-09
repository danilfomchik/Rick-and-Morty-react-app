import { useState } from "react";

export const useCurrentPage = (allPagesCount) => {
    const [currentPage, setCurrentPage] = useState(1);

    const setNewPage = (page) => {
        setCurrentPage(page);
    };

    const increaseCurrentPage = () => {
        setCurrentPage((page) =>
            page < allPagesCount ? page + 1 : allPagesCount
        );
    };

    const decreaseCurrentPage = () => {
        setCurrentPage((page) => (page > 1 ? page - 1 : 1));
    };

    return {
        allPagesCount,
        currentPage,
        increaseCurrentPage,
        decreaseCurrentPage,
        setNewPage,
    };
};
