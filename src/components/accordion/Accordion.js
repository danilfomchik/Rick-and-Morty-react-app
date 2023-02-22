import { useState } from "react";
import "./accordion.scss";

const Accordion = ({
    id,
    accordion,
    toggleAccordion,
    onCurrentCategoryChange,
}) => {
    const [accordionTitle, setAccordionTitle] = useState(accordion.title);

    const onCategoryClick = (e, category) => {
        toggleAccordion(e, id);
        onCurrentCategoryChange(e, accordion.id, category);
        setAccordionTitle(category);
    };

    return (
        <div
            onClick={(e) => toggleAccordion(e, id)}
            className={`accordion-container${accordion.open ? " open" : ""}`}
        >
            <div className="accordion-container__title">{accordionTitle}</div>
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
