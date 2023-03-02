import { useState, createContext, useRef, useEffect } from "react";

import useApi from "../../../services/useApi";
import useGettingData from "../../../hooks/useGettingData";
import { useCurrentPage } from "../../../hooks/useCurrentPage";

import PagesBlock from "../../pagesBlock/PagesBlock";
import CharactersList from "../../charactersList/CharactersList";
import SearchPanel from "../../searchPanel/SearchPanel";
import FilterPanel from "../../filterPanel/FilterPanel";

import "./characters-page.scss";

export const CharactersPage = () => {
    const [query, setQuery] = useState("");
    const [data, setData] = useState([]);

    const searchRef = useRef(null);

    const currentPageControls = useCurrentPage();
    const { resetCurrentPage, setAllPagesCount, currentPage } =
        currentPageControls;

    const { loading, error, getCharacters, clearError } = useApi();

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

    // ----------------
    const onCharactersLoading = () => {
        getCharacters({
            query,
            currentPage,
            // оптимизировать с помощью цикла
            status: accordions[0].currentCategory,
            species: accordions[1].currentCategory,
            gender: accordions[2].currentCategory,
            // оптимизировать с помощью цикла
        }).then(onCharactersLoaded);
    };

    const onCharactersLoaded = (data) => {
        setData(data.result);
        setAllPagesCount(data.pages);
    };

    useEffect(() => {
        clearError();

        // применить useTransition
        onCharactersLoading();
        // применить useTransition
    }, [
        currentPage,
        query,
        ...accordions.map((accordion) => accordion.currentCategory),
    ]);
    // ----------------

    const onClearFilters = () => {
        setAccordions(
            accordions.map((accordion) => {
                return {
                    ...accordion,
                    currentCategory: "",
                };
            })
        );

        resetCurrentPage();
    };

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

                <div className="filter-panel__clear-btn">
                    <span onClick={onClearFilters}>Clear</span>
                </div>

                <FilterPanel
                    currentPageControls={currentPageControls}
                    accordions={accordions}
                    setAccordions={setAccordions}
                />
            </div>

            <CharactersList
                data={data}
                loading={loading}
                error={error}
                currentPageControls={currentPageControls}
            />

            {!error && (
                <PagesBlock
                    searchRef={searchRef}
                    controls={currentPageControls}
                />
            )}
        </div>
    );
};
