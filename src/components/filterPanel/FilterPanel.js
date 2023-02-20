import { useState } from "react";

import Accordion from "../accordion/Accordion";

import "./filter-panel.scss";

const FilterPanel = ({ accordions, setAccordions }) => {
    const toggleAccordion = (e, index) => {
        if (!e.target.classList.contains("filter-button")) {
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

    const onCurrentCategoryChange = (accordiontId, currentCategory) => {
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
                />
            ))}
        </div>
    );
};

export default FilterPanel;
