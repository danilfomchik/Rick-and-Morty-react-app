import { useEffect } from "react";

import CharactersList from "../../charactersList/CharactersList";

import useApi from "../../../services/useApi";
import useGettingData from "../../../hooks/useGettingData";
import { useCurrentPage } from "../../../hooks/useCurrentPage";

const LocationsPage = () => {
    // // ------------
    // const currentPageControls = useCurrentPage();
    // const { allPagesCount, setAllPagesCount, currentPage } =
    //     currentPageControls;

    // const { loading, error, getLocation, clearError } = useApi();

    // const { onCharactersLoading, data, dataInfo } =
    //     useGettingData(setAllPagesCount);
    // // ------------

    // useEffect(
    //     () => {
    //         clearError();
    //         onCharactersLoading(getLocation, 1);
    //     },
    //     [
    //         // менять при изменении параметра в onCharactersLoading(func, param)
    //     ]
    // );

    return (
        <div className="location">
            <h1 className="locations__title page-title">Locations</h1>

            {/* здесь будет компонент аккордеона, он будет менять id локации */}

            {/* <CharactersList
                data={data}
                loading={loading}
                error={error}
                currentPageControls={currentPageControls}
            /> */}
        </div>
    );
};

export default LocationsPage;
