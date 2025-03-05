import {useCallback} from 'react';

import {useHttp} from '../hooks/http.hook';

const useApi = () => {
    const {loading, request, error, clearError} = useHttp();

    const _apiBase = 'https://rickandmortyapi.com/api/';

    const getCharacters = useCallback(
        async ({query = '', currentPage = 1, filterQueries}, requestOptions) => {
            const characters = await request(
                `${_apiBase}character/?page=${currentPage}&name=${query}${filterQueries}`,
                'GET',
                null,
                requestOptions.signal,
            );

            return {
                result: characters.results.map(_transformCharacter),
                count: characters.info.count,
                pages: characters.info.pages,
            };
        },
        [request],
    );

    const getAllCharactersCount = async () => {
        const characters = await request(`${_apiBase}character`);

        return characters.info.count;
    };

    const getSingleCharacter = useCallback(
        async id => {
            const character = await request(`${_apiBase}character/${id}`);

            return _transformCharacter(character);
        },
        [request],
    );

    const getLocation = useCallback(
        async (currentLocation = 1) => {
            const location = await request(`${_apiBase}location/${currentLocation}`);

            let characters = await Promise.all(
                location.residents.map(async charLink => {
                    const res = await getSingleCharacter(charLink.replace(/\D/g, ''));
                    return res;
                }),
            );

            let dimention = '';

            if (location.dimension === '') {
                dimention = 'Unknown';
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
                result: characters,
            };
        },
        [getSingleCharacter, request],
    );

    const getEpisode = useCallback(
        async (currentEpisode = 1) => {
            const episode = await request(`${_apiBase}episode/${currentEpisode}`);

            let characters = await Promise.all(
                episode.characters.map(async charLink => {
                    const res = await getSingleCharacter(charLink.replace(/\D/g, ''));
                    return res;
                }),
            );

            return {
                info: {
                    air_date: episode.air_date,
                    episode: episode.episode,
                    id: episode.id,
                    name: episode.name,
                },
                result: characters,
            };
        },
        [getSingleCharacter, request],
    );

    const getDataCount = useCallback(
        async dataName => {
            const episode = await request(`${_apiBase}${dataName}`);

            return episode.info.count;
        },
        [request],
    );

    const _transformCharacter = char => {
        return {
            id: char.id,
            name: char.name,
            location: char.location.name,
            thumbnail: char.image,
            origin: char.origin.name,
            species: char.species,
            status: char.status,
            gender: char.gender,
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
