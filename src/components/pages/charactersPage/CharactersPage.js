import { useState, createContext, useRef } from "react";

import { useCurrentPage } from "../../../hooks/useCurrentPage";

import CharactersList from "../../charactersList/CharactersList";
import SearchPanel from "../../searchPanel/SearchPanel";
// import FilterPanel from "../../filterPanel/FilterPanel";

import "./characters-page.scss";

export const CurrentPageContext = createContext();

export const CharactersPage = () => {
    const [query, setQuery] = useState("");
    const searchRef = useRef(null);

    const currentPageControls = useCurrentPage();

    return (
        <div className="characters">
            <h1 className="characters__title page-title">Characters</h1>

            <div className="characters__search-panel">
                <SearchPanel
                    currentPageControls={currentPageControls}
                    searchRef={searchRef}
                    query={query}
                    setQuery={setQuery}
                />

                {/* <FilterPanel /> */}
            </div>

            <CharactersList
                currentPageControls={currentPageControls}
                query={query}
                scrollRef={searchRef}
            />
        </div>
    );
};
