import {Outlet, useOutlet} from 'react-router-dom';

import useData from '../../../hooks/useData';
import useApi from '../../../services/useApi';
import Accordion from '../../accordion/Accordion';
import CharactersList from '../../charactersList/CharactersList';
import ErrorBoundery from '../../errorBoundary/ErrorBoundery';
import './locations-page.scss';

const LocationsPage = () => {
    const outlet = useOutlet();

    const {loading, error, getLocation} = useApi();
    const {toggleAccordion, onCurrentCategoryChange, data, dataInfo, accordion} = useData(getLocation, 'location');

    return (
        <>
            {outlet ? (
                <Outlet />
            ) : (
                <div className="locations">
                    <h1 className="page-title">Locations</h1>

                    <h4 className="locations__title page-title__2">Pick location</h4>

                    <Accordion
                        customClass={'locations__accordion'}
                        id={0}
                        initialValue={1}
                        accordion={accordion}
                        toggleAccordion={toggleAccordion}
                        onCurrentCategoryChange={onCurrentCategoryChange}
                    />

                    {!error && (
                        <div className="locations__location-info">
                            <h1 className="locations__title">
                                Location: <span>{dataInfo.name}</span>
                            </h1>
                            <h3 className="locations__title">
                                Dimension: <span>{dataInfo.dimension}</span>
                            </h3>
                            <h4 className="locations__title">
                                Type: <span>{dataInfo.type}</span>
                            </h4>
                        </div>
                    )}

                    <ErrorBoundery>
                        <CharactersList data={data} error={error} loading={loading} />
                    </ErrorBoundery>
                </div>
            )}
        </>
    );
};

export default LocationsPage;
