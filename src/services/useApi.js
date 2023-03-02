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
        const location = await request(`${_apiBase}location`);

        return {
            count: location.info.count,
        };

        // let characters = await Promise.all(
        //     location.residents.map(async (charLink) => {
        //         const res = await getSingleCharacter(charLink);
        //         return res;
        //     })
        // );

        // return {
        //     info: {
        //         name: location.name,
        //         dimension: location.dimension,
        //         id: location.id,
        //         type: location.type,
        //     },
        //     result: characters,
        // };
    };

    const getEpisode = async (currentEpisode = 0) => {
        // const episode = await request(`${_apiBase}episode/${currentEpisode}`);
        const episode = await request(`${_apiBase}episode`);

        let characters = await Promise.all(
            episode.results[currentEpisode].characters.map(async (charLink) => {
                const res = await getSingleCharacter(charLink);
                return res;
            })
        );

        return {
            info: {
                air_date: episode.results[currentEpisode].air_date,
                episode: episode.results[currentEpisode].episode,
                id: episode.results[currentEpisode].id,
                name: episode.results[currentEpisode].name,
            },
            count: episode.info.count,
            result: characters,
        };
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
        loading,
        error,
        clearError,
    };
};

export default useApi;
