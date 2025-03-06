import {useQuery} from '@apollo/client';
import {useMemo, useRef, useState} from 'react';
import {Outlet, useOutlet} from 'react-router-dom';

import {ALL_CHARACTERS} from '../../../apollo/queries/characters';
import {useCurrentPage} from '../../../hooks/useCurrentPage';
import CharactersList from '../../charactersList/CharactersList';
import ErrorBoundery from '../../errorBoundary/ErrorBoundery';
import FilterPanel from '../../filterPanel/FilterPanel';
import PagesBlock from '../../pagesBlock/PagesBlock';
import SearchPanel from '../../searchPanel/SearchPanel';
import './characters-page.scss';

export const CharactersPage = () => {
    const [query, setQuery] = useState('');
    const [accordions, setAccordions] = useState([
        {
            id: 0,
            title: 'Status',
            options: ['alive', 'dead', 'unknown'],
            currentValue: '',
            open: false,
        },
        {
            id: 1,
            title: 'Species',
            options: [
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
            options: ['female', 'male', 'genderless', 'unknown'],
            currentValue: '',
            open: false,
        },
    ]);

    const outlet = useOutlet();
    const searchRef = useRef(null);
    const currentPageControls = useCurrentPage();

    const {resetCurrentPage, currentPage, increaseCurrentPage, decreaseCurrentPage, setNewPage} = currentPageControls;

    const filterQueries = useMemo(() => {
        const queries = {};

        accordions.forEach(accordion => {
            queries[accordion.title.toLowerCase()] = accordion.currentValue;
        });

        return queries;
    }, [accordions]);

    const {loading, error, data} = useQuery(ALL_CHARACTERS, {
        variables: {
            filter: {
                name: query,
                ...filterQueries,
            },
            page: currentPage,
        },
    });

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
                        <CharactersList data={data?.characters.results} error={error} loading={loading} />
                    </ErrorBoundery>

                    {!error && data?.characters.info.pages > 1 && (
                        <PagesBlock
                            searchRef={searchRef}
                            allPagesCount={data?.characters.info.pages}
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
