import { useState, memo, useEffect, useRef } from "react";

import useFilter from "../../hooks/useFilter";

import Accordion from "../accordion/Accordion";

import "./filter-panel.scss";

const FilterPanel = memo(
    ({ currentPageControls, accordions, setAccordions }) => {
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

        const onCurrentCategoryChange = (e, accordiontId, currentValue) => {
            e.stopPropagation();
            currentPageControls.resetCurrentPage();

            setAccordions(
                accordions.map((accordion) => {
                    if (accordion.id === accordiontId) {
                        return {
                            ...accordion,
                            currentValue,
                        };
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
                        initialValue={""}
                        accordion={accordion}
                        toggleAccordion={toggleAccordion}
                        onCurrentCategoryChange={onCurrentCategoryChange}
                    />
                ))}
            </div>
        );
    }
);

export default FilterPanel;
