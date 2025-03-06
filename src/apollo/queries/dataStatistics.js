import {gql} from '@apollo/client';

export const DATA_STATISTICS = gql`
    query GetDataStatistics {
        characters {
            info {
                count
            }
        }
        locations {
            info {
                count
            }
        }
        episodes {
            info {
                count
            }
        }
    }
`;
