import { useState, memo, useEffect } from "react";

import useFilter from "../../hooks/useFilter";

import Accordion from "../accordion/Accordion";

import "./filter-panel.scss";

const FilterPanel = memo(
    ({ currentPageControls, accordions, setAccordions }) => {
        const useFilterCategory = useFilter();

        // useEffect(() => {
        //     console.log(
        //         "useFilterCategory1-->",
        //         useFilterCategory.currentCategory
        //     );
        // }, [useFilterCategory.currentCategory]);

        const toggleAccordion = (e, index) => {
            if (!e.target.classList.contains("accordion-container__content")) {
                setAccordions(
                    accordions.map((accordion, i) => {
                        if (i === index) {
                            accordion.open = !accordion.open;
                        } else {
                            accordion.open = false;
                        }

                        return accordion;
                    })
                );
            }
        };

        const onCurrentCategoryChange = (e, accordiontId, currentCategory) => {
            e.stopPropagation();
            currentPageControls.resetCurrentPage();

            // useFilterCategory.onCategoryCheck(currentCategory);

            // console.log(
            //     "useFilterCategory2-->",
            //     useFilterCategory.currentCategory
            // );

            setAccordions(
                accordions.map((accordion) => {
                    if (accordion.id === accordiontId) {
                        return { ...accordion, currentCategory };
                    } else {
                        return accordion;
                    }
                })
            );
        };

        return (
            <div className="accordion__wrapper">
                {accordions.map((accordion, i) => (
                    <Accordion
                        id={i}
                        key={i}
                        accordion={accordion}
                        toggleAccordion={toggleAccordion}
                        onCurrentCategoryChange={onCurrentCategoryChange}
                        useFilterCategory={useFilterCategory}
                    />
                ))}
            </div>
        );
    }
);

export default FilterPanel;
