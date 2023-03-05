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

    const getAllCharactersCount = async () => {
        const characters = await request(`${_apiBase}character`);

        return characters.info.count;
    };

    const getLocation = async (currentLocation = 1) => {
        const location = await request(
            `${_apiBase}location/${currentLocation}`
        );

        let characters = await Promise.all(
            location.residents.map(async (charLink) => {
                const res = await getSingleCharacter(charLink);
                return res;
            })
        );

        // const currentLocationObj = location.results[currentLocation];
        let dimention = "";

        if (location.dimension === "") {
            dimention = "Unknown";
        } else {
            dimention = location.dimension;
        }

        return {
            info: {
                dimension: dimention,
                id: location.id,
                name: location.name,
                type: location.type,
            },
            // count: location.info.count,
            result: characters,
        };
    };

    const getEpisode = async (currentEpisode = 1) => {
        // const episode = await request(`${_apiBase}episode/${currentEpisode}`);
        const episode = await request(`${_apiBase}episode/${currentEpisode}`);

        let characters = await Promise.all(
            episode.characters.map(async (charLink) => {
                const res = await getSingleCharacter(charLink);
                return res;
            })
        );

        // const currentEpisodeObj = episode.results[currentEpisode];

        return {
            info: {
                air_date: episode.air_date,
                episode: episode.episode,
                id: episode.id,
                name: episode.name,
            },
            // count: episode.info.count,
            result: characters,
        };
    };

    const getDataCount = async (dataName) => {
        const episode = await request(`${_apiBase}${dataName}`);

        return episode.info.count;
    };

    const getSingleCharacter = async (url) => {
        const character = await request(url);

        return _transformCharacter(character);
    };

    const _transformCharacter = (char) => {
        return {
            id: char.id,
            name: char.name,
            location: char.location.name,
            thumbnail: char.image,
            origin: char.origin.name,
            species: char.species,
            status: char.status,
        };
    };

    return {
        getCharacters,
        getSingleCharacter,
        getAllCharactersCount,
        getLocation,
        getEpisode,
        getDataCount,
        loading,
        error,
        clearError,
    };
};

export default useApi;
