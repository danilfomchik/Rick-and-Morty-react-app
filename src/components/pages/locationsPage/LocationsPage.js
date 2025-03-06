import {useQuery} from '@apollo/client';
import {useEffect, useMemo, useState} from 'react';

import {LOCATION_INFO} from '../../../apollo/queries/characters';
import {DATA_STATISTICS} from '../../../apollo/queries/dataStatistics';
import {getArrayFromValue, onAccordionValueChange} from '../../../helpers/utils';
import Accordion from '../../accordion/Accordion';
import CharactersList from '../../charactersList/CharactersList';
import ErrorBoundery from '../../errorBoundary/ErrorBoundery';
import './locations-page.scss';

const LocationsPage = () => {
    const [accordion, setAccordion] = useState({
        id: 0,
        title: 'Locations',
        options: [],
        currentValue: 1,
        open: false,
    });

    const {data: statistics} = useQuery(DATA_STATISTICS);
    const {loading, error, data} = useQuery(LOCATION_INFO, {
        variables: {
            id: accordion.currentValue,
        },
    });

    const arrayFromLocationsCount = useMemo(() => getArrayFromValue(statistics?.locations.info.count), [statistics]);

    const toggleAccordion = () => {
        setAccordion(prev => ({
            ...prev,
            open: !prev.open,
        }));
    };

    const onCurrentValueChange = ({e, currentValue}) => {
        e.stopPropagation();

        onAccordionValueChange({currentValue, accordion, setAccordion, storageKey: 'currentLocation'});
    };

    useEffect(() => {
        if (statistics && accordion.options.length === 0) {
            setAccordion(prev => ({
                ...prev,
                options: arrayFromLocationsCount,
            }));
        }
    }, [accordion.options.length, arrayFromLocationsCount, statistics]);

    useEffect(() => {
        const storedLocation = window.sessionStorage.getItem('currentLocation');

        if (storedLocation) {
            setAccordion(prev => ({
                ...prev,
                currentValue: JSON.parse(storedLocation),
            }));
        }
    }, []);

    return (
        <div className="locations">
            <h1 className="page-title">Locations</h1>

            <h4 className="locations__title page-title__2">Pick location</h4>

            <Accordion
                customClass={'locations__accordion'}
                id={0}
                initialValue={accordion.currentValue}
                accordion={accordion}
                toggleAccordion={toggleAccordion}
                onCurrentCategoryChange={onCurrentValueChange}
            />

            {!error && (
                <div className="locations__location-info">
                    <h1 className="locations__title">
                        Location: <span>{data?.location.name}</span>
                    </h1>
                    <h3 className="locations__title">
                        Dimension: <span>{data?.location.dimension}</span>
                    </h3>
                    <h4 className="locations__title">
                        Type: <span>{data?.location.type}</span>
                    </h4>
                </div>
            )}

            <ErrorBoundery>
                <CharactersList data={data?.location.residents} error={error} loading={loading} />
            </ErrorBoundery>
        </div>
    );
};

export default LocationsPage;
