import { useHttp } from "../hooks/http.hook";

const useApi = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://rickandmortyapi.com/api/";
    const _defaultPage = 1;

    const getAllCharacters = async (page = _defaultPage) => {
        const characters = await request(`${_apiBase}character?page=${page}`);

        // console.log(characters);

        return characters.results.map(_transformCharacter);
    };

    const getAllPages = async () => {
        const characters = await request(`${_apiBase}character`);

        return characters.info.pages;
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            location: char.location.name,
            thumbnail: char.image,
            species: char.species,
            status: char.status,
        };
    };

    return { getAllCharacters, getAllPages, loading, error, clearError };
};

export default useApi;
