import { useState, createContext, useRef } from "react";

import CharactersList from "../charactersList/CharactersList";
import SearchPanel from "../searchPanel/SearchPanel";

export const CurrentPageContext = createContext();

export const CharactersPage = () => {
    const [query, setQuery] = useState("");
    const searchRef = useRef(null);

    return (
        <div className="characters">
            <h1>Characters</h1>

            <SearchPanel
                searchRef={searchRef}
                query={query}
                setQuery={setQuery}
            />

            <CharactersList query={query} scrollRef={searchRef} />
        </div>
    );
};
