import {useCallback, useState} from 'react';

export const useCurrentPage = () => {
    const [allPagesCount, setAllPagesCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const setNewPage = useCallback(page => {
        setCurrentPage(page);
    }, []);

    const increaseCurrentPage = useCallback(() => {
        setCurrentPage(page => (page < allPagesCount ? page + 1 : allPagesCount));
    }, [allPagesCount]);

    const decreaseCurrentPage = useCallback(() => {
        setCurrentPage(page => (page > 1 ? page - 1 : 1));
    }, []);

    const resetCurrentPage = useCallback(() => {
        setCurrentPage(1);
    }, []);

    return {
        allPagesCount,
        setAllPagesCount,
        currentPage,
        increaseCurrentPage,
        decreaseCurrentPage,
        setNewPage,
        resetCurrentPage,
    };
};
