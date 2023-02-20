import { useState } from "react";

import Accordion from "../accordion/Accordion";

import "./filter-panel.scss";

const FilterPanel = () => {
    const [accordions, setAccordions] = useState([
        {
            id: 0,
            title: "Status",
            categories: ["alive", "dead", "unknown"],
            currentCategory: "",
            open: false,
        },
        {
            id: 1,
            title: "Species",
            categories: [
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
            currentCategory: "",
            open: false,
        },
        {
            id: 2,
            title: "Gender",
            categories: ["female", "male", "genderless", "unknown"],
            currentCategory: "",
            open: false,
        },
    ]);

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
                    accordions={accordions}
                    accordion={accordion}
                    toggleAccordion={toggleAccordion}
                    setAccordions={setAccordions}
                />
            ))}
        </div>
    );
};

export default FilterPanel;
