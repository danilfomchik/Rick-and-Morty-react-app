import { useState, useEffect } from "react";

import useApi from "../services/useApi";

function useData(getDataFunc, param) {
    const [data, setData] = useState([]);
    const [dataInfo, setDataInfo] = useState({});
    const [dataCount, setDataCount] = useState(0);

    const { getDataCount, clearError } = useApi();

    const [accordion, setAccordion] = useState({
        id: 0,
        title: "",
        categories: [],
        currentValue: 1,
        open: false,
    });

    const [currentData, setCurrentData] = useState(1);

    useEffect(() => {
        getDataCount(param).then((count) => {
            // getDataCount("episode").then((count) => {
            setDataCount(count);
            setAccordion((prev) => ({
                ...prev,
                categories: setLocationAccordion(count),
            }));
        });
    }, []);

    useEffect(() => {
        clearError();

        getDataFunc(currentData).then((data) => {
            setDataInfo(data.info);
            setData(data.result);
        });
    }, [currentData]);

    const setLocationAccordion = (amount) => {
        let result = [];

        for (let i = 1; i <= amount; i++) {
            result.push(i);
        }

        return result;
    };

    const toggleAccordion = (e) => {
        if (!e.target.classList.contains("accordion-container__content")) {
            setAccordion((prev) => ({
                ...prev,
                open: !prev.open,
            }));
        }
    };

    const onCurrentCategoryChange = ({ e, accordiontId, currentValue }) => {
        e.stopPropagation();

        setAccordion((prev) => ({
            ...prev,
            currentValue,
        }));

        setCurrentData(currentValue);
    };

    const onCharacterCLick = () => {
        onCurrentCategoryChange({ currentValue: 1 });
    };

    return {
        toggleAccordion,
        onCurrentCategoryChange,
        onCharacterCLick,
        data,
        dataInfo,
        dataCount,
        currentData,
        accordion,
    };
}

export default useData;
