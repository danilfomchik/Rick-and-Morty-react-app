export const generateQueries = arr => {
    let queries = '';

    arr.forEach(element => {
        const query = `&${element.name.toLowerCase()}=${element.value}`;

        queries += query;
    });

    return queries;
};

export const getArrayFromValue = value => {
    return Array.from({length: value}, (value, index) => index + 1);
};

export const onAccordionValueChange = ({currentValue, accordion, setAccordion, storageKey}) => {
    if (currentValue === accordion.currentValue) {
        window.sessionStorage.removeItem(storageKey);
        setAccordion(prev => ({
            ...prev,
            currentValue: 1,
        }));
    } else {
        window.sessionStorage.setItem(storageKey, JSON.stringify(currentValue));
        setAccordion(prev => ({
            ...prev,
            currentValue,
        }));
    }
};
