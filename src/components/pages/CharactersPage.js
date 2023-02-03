import { useState } from "react";

import CharactersList from "../charactersList/CharactersList";
import SearchPanel from "../searchPanel/SearchPanel";

const CharactersPage = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="characters">
            <h1>Characters</h1>

            <SearchPanel query={query} setQuery={setQuery} />
            <CharactersList />
        </div>
    );
};

export default CharactersPage;
