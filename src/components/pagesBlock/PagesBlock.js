import {memo} from 'react';

import {getPageIntersection} from '../../helpers/getPageIntersection';
import {getArrayFromValue} from '../../helpers/utils';
import './pages-block.scss';

const PagesBlock = ({allPagesCount, currentPage, increaseCurrentPage, decreaseCurrentPage, setNewPage, searchRef}) => {
    const onPageChange = () => {
        searchRef.current.scrollIntoView({
            block: 'center',
            behavior: 'smooth',
        });
    };

    const renderPages = () => {
        const arrayFromLocationsCount = getArrayFromValue(allPagesCount);

        return arrayFromLocationsCount.map(page => (
            <div
                key={page}
                onClick={() => {
                    onPageChange();
                    setNewPage(page);
                }}
                className={page === currentPage ? 'characters-list__pages-page active' : 'characters-list__pages-page'}>
                <p>{page}</p>
            </div>
        ));
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
