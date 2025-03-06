import {useQuery} from '@apollo/client';
import {useEffect, useMemo, useState} from 'react';

import {EPISODE_INFO} from '../../../apollo/queries/characters';
import {DATA_STATISTICS} from '../../../apollo/queries/dataStatistics';
import {getArrayFromValue, onAccordionValueChange} from '../../../helpers/utils';
import Accordion from '../../accordion/Accordion';
import CharactersList from '../../charactersList/CharactersList';
import ErrorBoundery from '../../errorBoundary/ErrorBoundery';
import './episodes-page.scss';

const EpisodesPage = () => {
    const [accordion, setAccordion] = useState({
        id: 0,
        title: 'Episodes',
        options: [],
        currentValue: 1,
        open: false,
    });

    const {data: statistics} = useQuery(DATA_STATISTICS);
    const {loading, error, data} = useQuery(EPISODE_INFO, {
        variables: {
            id: accordion.currentValue,
        },
    });

    const arrayFromEpisodesCount = useMemo(() => getArrayFromValue(statistics?.episodes.info.count), [statistics]);

    const toggleAccordion = () => {
        setAccordion(prev => ({
            ...prev,
            open: !prev.open,
        }));
    };

    const onCurrentValueChange = ({e, currentValue}) => {
        e.stopPropagation();

        onAccordionValueChange({currentValue, accordion, setAccordion, storageKey: 'currentEpisode'});
    };

    useEffect(() => {
        if (statistics && accordion.options.length === 0) {
            setAccordion(prev => ({
                ...prev,
                options: arrayFromEpisodesCount,
            }));
        }
    }, [accordion.options.length, arrayFromEpisodesCount, statistics]);

    useEffect(() => {
        const storedEpisode = window.sessionStorage.getItem('currentEpisode');

        if (storedEpisode) {
            setAccordion(prev => ({
                ...prev,
                currentValue: JSON.parse(storedEpisode),
            }));
        }
    }, []);

    return (
        <div className="episodes">
            <h1 className="page-title">Episodes</h1>

            <h4 className="episodes__title page-title__2">Pick Episode</h4>

            <Accordion
                customClass={'episodes__accordion'}
                id={0}
                initialValue={accordion.currentValue}
                accordion={accordion}
                toggleAccordion={toggleAccordion}
                onCurrentCategoryChange={onCurrentValueChange}
            />

            {!error && (
                <div className="episodes__episode-info">
                    <h1 className="episodes__title">
                        Episode name: <span>{data?.episode.name}</span>
                    </h1>
                    <h3 className="episodes__title">
                        Air date: <span>{data?.episode.air_date}</span>
                    </h3>
                </div>
            )}

            <ErrorBoundery>
                <CharactersList data={data?.episode.characters} error={error} loading={loading} />
            </ErrorBoundery>
        </div>
    );
};

export default EpisodesPage;
