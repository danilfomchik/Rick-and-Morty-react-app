import { useState } from "react";

import "./accordion.scss";

const Accordion = ({
    id,
    accordion,
    toggleAccordion,
    currentFilterParam,
    setCurrentFilterParam,
}) => {
    // при переключении активной категории оперировать id аккордеона, чтобы категория относлась к конкретному аккордеону

    return (
        <div
            onClick={(e) => toggleAccordion(e, id)}
            className={`accordion-container${accordion.open ? " open" : ""}`}
        >
            <div className="accordion-container__title">{accordion.title}</div>
            <div className="accordion-container__content">
                {accordion.category.map((category, i) => (
                    <button
                        className={`button filter-button${
                            currentFilterParam === category.toLowerCase()
                                ? " active"
                                : ""
                        }`}
                        onClick={() =>
                            setCurrentFilterParam(category.toLowerCase())
                        }
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
