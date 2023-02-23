import { useState, createContext, useRef } from "react";

import { useCurrentPage } from "../../../hooks/useCurrentPage";
import useFilter from "../../../hooks/useFilter";

import CharactersList from "../../charactersList/CharactersList";
import SearchPanel from "../../searchPanel/SearchPanel";
import FilterPanel from "../../filterPanel/FilterPanel";

import "./characters-page.scss";

export const CurrentPageContext = createContext();

export const CharactersPage = () => {
    const [query, setQuery] = useState("");
    const searchRef = useRef(null);

    const [accordions, setAccordions] = useState([
        {
            id: 0,
            title: "Status",
            categories: ["alive", "dead", "unknown"],
            currentCategory: "",
            open: false,
        },
        {
            id: 1,
            title: "Species",
            categories: [
                "Human",
                "Alien",
                "Humanoid",
                "Poopybutthole",
                "Mythological",
                "Unknown",
                "Animal",
                "Disease",
                "Robot",
                "Cronenberg",
                "Planet",
            ],
            currentCategory: "",
            open: false,
        },
        {
            id: 2,
            title: "Gender",
            categories: ["female", "male", "genderless", "unknown"],
            currentCategory: "",
            open: false,
        },
    ]);

    const currentPageControls = useCurrentPage();

    return (
        <div className="characters">
            <h1 className="characters__title page-title">Characters</h1>

            <div className="characters__filter-panel">
                <SearchPanel
                    currentPageControls={currentPageControls}
                    searchRef={searchRef}
                    query={query}
                    setQuery={setQuery}
                />

                <FilterPanel
                    currentPageControls={currentPageControls}
                    accordions={accordions}
                    // useFilterCategory={useFilterCategory}
                    setAccordions={setAccordions}
                />
            </div>

            <CharactersList
                currentPageControls={currentPageControls}
                query={query}
                scrollRef={searchRef}
                accordions={accordions}
                setAccordions={setAccordions}
            />
        </div>
    );
};
