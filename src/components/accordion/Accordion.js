import { useState, useEffect } from "react";

import useFilter from "../../hooks/useFilter";

import "./accordion.scss";

const Accordion = ({
    customClass,
    id,
    initialValue,
    accordion,
    toggleAccordion,
    onCurrentCategoryChange,
}) => {
    const { currentValue, onCategoryCheck } = useFilter(initialValue);

    const onCategoryClick = (e, category) => {
        onCategoryCheck(category);
        toggleAccordion(e, id);
        onCurrentCategoryChange(e, accordion.id, currentValue.current);
        // onCurrentCategoryChange({e, accordionId: accordion.id, currentValue: currentValue.current});
    };

    return (
        <div
            onClick={(e) => toggleAccordion(e, id)}
            className={`accordion-container${accordion.open ? " open" : ""} ${
                customClass ? customClass : ""
            }`}
        >
            <div className="accordion-container__title">
                {accordion.currentValue === ""
                    ? accordion.title
                    : accordion.currentValue}
            </div>
            <div className="accordion-container__content">
                {accordion.categories.map((category, i) => (
                    <button
                        className={`button filter-button${
                            accordion.currentValue === category ? " active" : ""
                        }`}
                        onClick={(e) => {
                            onCategoryClick(e, category);
                        }}
                        data-value={category}
                        key={i}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default Accordion;
