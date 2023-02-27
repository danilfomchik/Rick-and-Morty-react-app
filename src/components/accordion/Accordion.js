import { useState, useEffect } from "react";

import useFilter from "../../hooks/useFilter";

import "./accordion.scss";

const Accordion = ({
    id,
    accordion,
    toggleAccordion,
    onCurrentCategoryChange,
}) => {
    const { currentCategory, onCategoryCheck } = useFilter();

    const onCategoryClick = (e, category) => {
        onCategoryCheck(category);
        toggleAccordion(e, id);
        onCurrentCategoryChange(e, accordion.id, currentCategory.current);
    };

    return (
        <div
            onClick={(e) => toggleAccordion(e, id)}
            className={`accordion-container${accordion.open ? " open" : ""}`}
        >
            <div className="accordion-container__title">
                {accordion.currentCategory === ""
                    ? accordion.title
                    : accordion.currentCategory}
            </div>
            <div className="accordion-container__content">
                {accordion.categories.map((category, i) => (
                    <button
                        className={`button filter-button${
                            accordion.currentCategory === category
                                ? " active"
                                : ""
                        }`}
                        onClick={(e) => {
                            onCategoryClick(e, category);
                        }}
                        data-category={category.toLowerCase()}
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
