import { useHttp } from "../hooks/http.hook";

const useApi = () => {
    const { loading, request, error, clearError } = useHttp();

    const _apiBase = "https://rickandmortyapi.com/api/";

    const getCharacters = async ({
        query = "",
        status = "",
        gender = "",
        species = "",
        currentPage = 1,
    }) => {
        const characters = await request(
            `${_apiBase}character/?page=${currentPage}&name=${query}&status=${status}&gender=${gender}&species=${species}`
        );

        return {
            result: characters.results.map(_transformCharacter),
            count: characters.info.count,
            pages: characters.info.pages,
        };
    };

    const getLocations = async () => {
        const locations = await request(`${_apiBase}location`);

        return {
            result: locations.results.map(_transformCharacter),
            count: locations.info.count,
            pages: locations.info.pages,
        };
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

    return {
        getCharacters,
        getLocations,
        loading,
        error,
        clearError,
    };
};

export default useApi;
