import {memo, useCallback, useMemo} from 'react';

import Accordion from '../accordion/Accordion';
import './filter-panel.scss';

const FilterPanel = ({resetCurrentPage, accordions, setAccordions}) => {
    const hasSelectedFilter = useMemo(() => accordions.some(accordion => accordion.currentValue), [accordions]);

    const toggleAccordion = useCallback(
        (e, index) => {
            if (!e.target.classList.contains('accordion-container__content')) {
                setAccordions(
                    accordions.map((accordion, i) => {
                        if (i === index) {
                            accordion.open = !accordion.open;
                        } else {
                            accordion.open = false;
                        }

                        return accordion;
                    }),
                );
            }
        },
        [accordions, setAccordions],
    );

    const onCurrentCategoryChange = useCallback(
        ({e, accordiontId, currentValue}) => {
            e.stopPropagation();
            resetCurrentPage();

            setAccordions(prev =>
                prev.map(accordion => {
                    if (accordion.id === accordiontId) {
                        return {
                            ...accordion,
                            currentValue,
                        };
                    } else {
                        return accordion;
                    }
                }),
            );
        },
        [resetCurrentPage, setAccordions],
    );

    const onClearFilters = useCallback(() => {
        setAccordions(prev =>
            prev.map(accordion => {
                return {
                    ...accordion,
                    currentValue: '',
                };
            }),
        );

        resetCurrentPage();
    }, [setAccordions, resetCurrentPage]);

    return (
        <>
            <div className="filter-panel__clear-btn">
                {hasSelectedFilter && <span onClick={onClearFilters}>Clear</span>}
            </div>

            <div className="accordion__wrapper">
                {accordions.map((accordion, i) => (
                    <Accordion
                        id={i}
                        key={i}
                        accordion={accordion}
                        toggleAccordion={toggleAccordion}
                        onCurrentCategoryChange={onCurrentCategoryChange}
                    />
                ))}
            </div>
        </>
    );
};

export default memo(FilterPanel);
