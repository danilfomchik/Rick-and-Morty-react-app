import {useCallback, useEffect, useMemo, useRef, useState} from 'react';
import {Outlet, useOutlet} from 'react-router-dom';

import {generateQueries} from '../../../helpers/utils';
import {useCurrentPage} from '../../../hooks/useCurrentPage';
import useApi from '../../../services/useApi';
import CharactersList from '../../charactersList/CharactersList';
import ErrorBoundery from '../../errorBoundary/ErrorBoundery';
import FilterPanel from '../../filterPanel/FilterPanel';
import PagesBlock from '../../pagesBlock/PagesBlock';
import SearchPanel from '../../searchPanel/SearchPanel';
import './characters-page.scss';

export const CharactersPage = () => {
    const [query, setQuery] = useState('');
    const [data, setData] = useState([]);
    const [accordions, setAccordions] = useState([
        {
            id: 0,
            title: 'Status',
            categories: ['alive', 'dead', 'unknown'],
            currentValue: '',
            open: false,
        },
        {
            id: 1,
            title: 'Species',
            categories: [
                'Human',
                'Alien',
                'Humanoid',
                'Poopybutthole',
                'Mythological',
                'Unknown',
                'Animal',
                'Disease',
                'Robot',
                'Cronenberg',
                'Planet',
            ],
            currentValue: '',
            open: false,
        },
        {
            id: 2,
            title: 'Gender',
            categories: ['female', 'male', 'genderless', 'unknown'],
            currentValue: '',
            open: false,
        },
    ]);

    const outlet = useOutlet();
    const searchRef = useRef(null);
    const {loading, error, getCharacters, clearError} = useApi();
    const currentPageControls = useCurrentPage();

    const {
        resetCurrentPage,
        setAllPagesCount,
        currentPage,
        allPagesCount,
        increaseCurrentPage,
        decreaseCurrentPage,
        setNewPage,
    } = currentPageControls;

    const filterQueries = useMemo(() => {
        const queriesArray = accordions.map(accordion => {
            return {
                name: accordion.title,
                value: accordion.currentValue,
            };
        });

        return generateQueries(queriesArray);
    }, [accordions]);

    const onCharactersLoaded = useCallback(
        data => {
            setData(data.result);
            setAllPagesCount(data.pages);
        },
        [setAllPagesCount],
    );

    const onCharactersLoading = useCallback(
        async controller => {
            if (controller.signal.aborted) return;

            try {
                const data = await getCharacters(
                    {
                        query,
                        currentPage,
                        filterQueries,
                    },
                    {
                        signal: controller.signal,
                    },
                );

                if (!controller.signal.aborted) {
                    onCharactersLoaded(data);
                }
            } catch (e) {
                if (e.name === 'AbortError') return;
            }
        },
        [currentPage, filterQueries, getCharacters, onCharactersLoaded, query],
    );

    useEffect(() => {
        clearError();

        const controller = new AbortController();

        onCharactersLoading(controller);

        return () => controller.abort();
    }, [clearError, onCharactersLoading]);

    return (
        <>
            {outlet ? (
                <Outlet />
            ) : (
                <div className="characters">
                    <h1 className="characters__title page-title">Characters</h1>

                    <div className="characters__filter-panel">
                        <SearchPanel
                            resetCurrentPage={resetCurrentPage}
                            searchRef={searchRef}
                            query={query}
                            setQuery={setQuery}
                        />

                        <FilterPanel
                            resetCurrentPage={resetCurrentPage}
                            accordions={accordions}
                            setAccordions={setAccordions}
                        />
                    </div>

                    <ErrorBoundery>
                        <CharactersList data={data} error={error} loading={loading} />
                    </ErrorBoundery>

                    {!error && allPagesCount > 1 && (
                        <PagesBlock
                            searchRef={searchRef}
                            allPagesCount={allPagesCount}
                            currentPage={currentPage}
                            increaseCurrentPage={increaseCurrentPage}
                            decreaseCurrentPage={decreaseCurrentPage}
                            setNewPage={setNewPage}
                        />
                    )}
                </div>
            )}
        </>
    );
};
