import { useEffect, useRef, useState } from "react";

import Accordion from "../accordion/Accordion";

import "./filter-panel.scss";

const FilterPanel = () => {
    const [accordions, setAccordions] = useState([
        {
            title: "Status",
            category: ["alive", "dead", "unknown"],
            open: false,
        },
        {
            title: "Species",
            category: [
                "Human",
                "Alien",
                "Humanoid",
                "Poopybutthole",
                "Mythological",
                "Unknown",
                "Animal",
                "Disease",
                "Robot",
                "Cronenberg",
                "Planet",
            ],
            open: false,
        },
        {
            title: "Gender",
            category: ["female", "male", "genderless", "unknown"],
            open: false,
        },
    ]);

    // сделать массив с обьктами, в каждом будет id и категория.
    // пример:
    // id: 0 - category: 'alive'
    // id: 1 - category: ''
    // id: 2 - category: 'male'
    const [currentFilterParam, setCurrentFilterParam] = useState(null);

    const toggleAccordion = (e, index) => {
        // e.stopPropagation();

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

    return (
        <div className="accordion__wrapper">
            {accordions.map((accordion, i) => (
                <Accordion
                    id={i}
                    key={i}
                    accordion={accordion}
                    toggleAccordion={toggleAccordion}
                    currentFilterParam={currentFilterParam}
                    setCurrentFilterParam={setCurrentFilterParam}
                />
            ))}
        </div>
    );
};

export default FilterPanel;
