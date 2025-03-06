import arrow from '../../resources/down-arrow-2.png';
import './accordion.scss';

const Accordion = ({customClass, id, accordion, toggleAccordion, onCurrentCategoryChange}) => {
    const onOptionClick = (e, newValue) => {
        toggleAccordion(e, id);
        onCurrentCategoryChange({
            e,
            accordionId: accordion.id,
            currentValue: newValue,
        });
    };

    return (
        <div
            onClick={e => toggleAccordion(e, id)}
            className={`accordion-container${accordion.open ? ' open' : ''} ${customClass ? customClass : ''}`}>
            <div className="accordion-container__title">
                {accordion.currentValue === '' ? accordion.title : accordion.currentValue}

                <img src={arrow} className="arrow" alt="Arrow" />
            </div>
            <div className="accordion-container__content">
                {accordion.options.length > 0 ? (
                    accordion.options.map((option, i) => (
                        <button
                            className={`button filter-button${accordion.currentValue === option ? ' active' : ''}`}
                            onClick={e => {
                                onOptionClick(e, option);
                            }}
                            data-value={option}
                            key={i}>
                            {option}
                        </button>
                    ))
                ) : (
                    <div className="error-component">
                        <h4>No options loaded</h4>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Accordion;
