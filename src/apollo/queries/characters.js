import {gql} from '@apollo/client';

export const ALL_CHARACTERS = gql`
    query GetCharacters($page: Int, $filter: FilterCharacter) {
        characters(page: $page, filter: $filter) {
            info {
                count
                pages
            }
            results {
                id
                name
                location {
                    name
                }
                thumbnail: image
                status
                species
                gender
            }
        }
    }
`;

export const CHARACTER_INFO = gql`
    query GetCharacterInfo($id: ID!) {
        character(id: $id) {
            id
            name
            origin {
                name
            }
            location {
                name
            }
            thumbnail: image
            status
            species
            gender
        }
    }
`;

export const EPISODE_INFO = gql`
    query GetEpisodeInfo($id: ID!) {
        episode(id: $id) {
            name
            air_date
            characters {
                id
                name
                location {
                    name
                }
                thumbnail: image
                status
                species
                gender
            }
        }
    }
`;

export const LOCATION_INFO = gql`
    query GetLocationInfo($id: ID!) {
        location(id: $id) {
            name
            dimension
            type
            residents {
                id
                name
                location {
                    name
                }
                thumbnail: image
                status
                species
                gender
            }
        }
    }
`;
