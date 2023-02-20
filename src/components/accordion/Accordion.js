import "./accordion.scss";

const Accordion = ({
    id,
    accordion,
    toggleAccordion,
    accordions,
    setAccordions,
}) => {
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
        <div
            onClick={(e) => toggleAccordion(e, id)}
            className={`accordion-container${accordion.open ? " open" : ""}`}
        >
            <div className="accordion-container__title">{accordion.title}</div>
            <div className="accordion-container__content">
                {accordion.categories.map((category, i) => (
                    <button
                        className={`button filter-button${
                            accordion.currentCategory === category
                                ? " active"
                                : ""
                        }`}
                        onClick={() => {
                            onCurrentCategoryChange(accordion.id, category);
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
