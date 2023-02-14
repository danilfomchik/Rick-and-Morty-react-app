import { memo } from "react";
import "./search-panel.scss";

function arePropsEqual(prevProps, nextProps) {
    return prevProps.query === nextProps.query;
}

const SearchPanel = memo(
    ({ query, setQuery, searchRef, currentPageControls }) => {
        const onValueChange = (value) => {
            currentPageControls.resetCurrentPage();
            setQuery(value);
        };

        return (
            <div className="search-panel">
                <input
                    ref={searchRef}
                    type="text"
                    value={query}
                    onChange={(e) => onValueChange(e.target.value)}
                    placeholder="Search for characters"
                    className="search-panel__input"
                />
            </div>
        );
    },
    arePropsEqual
);

export default SearchPanel;
