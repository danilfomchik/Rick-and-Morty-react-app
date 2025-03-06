import {useCallback, useState} from 'react';

export const useCurrentPage = () => {
    const [allPagesCount, setAllPagesCount] = useState(1);
    const [currentPage, setCurrentPage] = useState(1);

    const setNewPage = useCallback(page => {
        setCurrentPage(page);
    }, []);

    const increaseCurrentPage = useCallback(() => {
        setCurrentPage(page => ++page);
    }, []);

    const decreaseCurrentPage = useCallback(() => {
        setCurrentPage(page => --page);
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
