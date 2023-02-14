import { useState, useEffect, useContext, memo } from "react";
import { getPageIntersection } from "../../helpers/getPageIntersection";

import { useCurrentPage } from "../../hooks/useCurrentPage";

import "./pages-block.scss";

function arePropsEqual(prevProps, nextProps) {
    return prevProps.allPagesCount === nextProps.allPagesCount;
}

const PagesBlock = ({ allPagesCount, controls }) => {
    const {
        currentPage,
        increaseCurrentPage,
        decreaseCurrentPage,
        setNewPage,
    } = controls;

    const renderPages = (pagesCount) => {
        let pages = [];

        for (let page = 0; page < pagesCount; page++) {
            let currPage = page + 1;

            pages.push(
                <div
                    key={currPage}
                    onClick={() => setNewPage(currPage)}
                    className={
                        currPage === currentPage
                            ? "characters-list__pages-page active"
                            : "characters-list__pages-page"
                    }
                >
                    <p>{currPage}</p>
                </div>
            );
        }

        return pages;
    };

    const pagesBlocks = getPageIntersection(
        renderPages(allPagesCount),
        currentPage
    );

    return (
        <div className="characters-list__pages">
            <button
                onClick={decreaseCurrentPage}
                className="button characters-list__pages-page"
                disabled={currentPage === 1}
            >
                <p>Prev</p>
            </button>
            {pagesBlocks}
            <button
                onClick={increaseCurrentPage}
                className="button characters-list__pages-page"
                disabled={currentPage === allPagesCount}
            >
                <p>Next</p>
            </button>
        </div>
    );
};

export default PagesBlock;
