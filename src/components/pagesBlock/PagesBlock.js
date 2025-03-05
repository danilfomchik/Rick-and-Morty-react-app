import {memo} from 'react';

import {getPageIntersection} from '../../helpers/getPageIntersection';
import './pages-block.scss';

const PagesBlock = ({allPagesCount, currentPage, increaseCurrentPage, decreaseCurrentPage, setNewPage, searchRef}) => {
    const onPageChange = () => {
        searchRef.current.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        });
    };

    const renderPages = pagesCount => {
        let pages = [];

        for (let page = 0; page < pagesCount; page++) {
            let currPage = page + 1;

            pages.push(
                <div
                    key={currPage}
                    onClick={() => {
                        onPageChange();
                        setNewPage(currPage);
                    }}
                    className={
                        currPage === currentPage ? 'characters-list__pages-page active' : 'characters-list__pages-page'
                    }>
                    <p>{currPage}</p>
                </div>,
            );
        }

        return pages;
    };

    const pagesBlocks = getPageIntersection(renderPages(allPagesCount), currentPage);

    return (
        <div className="characters-list__pages">
            <button
                onClick={() => {
                    onPageChange();
                    decreaseCurrentPage();
                }}
                className="button characters-list__pages-page"
                disabled={currentPage === 1}>
                <p>Prev</p>
            </button>
            {pagesBlocks}
            <button
                onClick={() => {
                    onPageChange();
                    increaseCurrentPage();
                }}
                className="button characters-list__pages-page"
                disabled={currentPage === allPagesCount}>
                <p>Next</p>
            </button>
        </div>
    );
};

export default memo(PagesBlock);
