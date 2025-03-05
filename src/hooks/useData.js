import {useCallback, useEffect, useState} from 'react';

import useApi from '../services/useApi';

function useData(getDataFunc, param) {
    const [data, setData] = useState([]);
    const [dataInfo, setDataInfo] = useState({});

    const {getDataCount, clearError} = useApi();

    const [accordion, setAccordion] = useState({
        id: 0,
        title: '',
        categories: [],
        currentValue: 1,
        open: false,
    });

    const [currentData, setCurrentData] = useState(1);

    const onGetDataCount = useCallback(async () => {
        const responseData = await getDataCount(param);

        setAccordion(prev => ({
            ...prev,
            categories: setLocationAccordion(responseData),
        }));
    }, [getDataCount, param]);

    const onGetData = useCallback(async () => {
        clearError();

        const responseData = await getDataFunc(currentData);

        setDataInfo(responseData.info);
        setData(responseData.result);
    }, [clearError, currentData, getDataFunc]);

    useEffect(() => {
        onGetDataCount();
    }, [onGetDataCount]);

    useEffect(() => {
        onGetData();
    }, [onGetData]);

    const setLocationAccordion = amount => {
        let result = [];

        for (let i = 1; i <= amount; i++) {
            result.push(i);
        }

        return result;
    };

    const toggleAccordion = e => {
        if (!e.target.classList.contains('accordion-container__content')) {
            setAccordion(prev => ({
                ...prev,
                open: !prev.open,
            }));
        }
    };

    const onCurrentCategoryChange = useCallback(({e, currentValue}) => {
        e.stopPropagation();

        setAccordion(prev => ({
            ...prev,
            currentValue,
        }));

        setCurrentData(currentValue);
    }, []);

    const onCharacterCLick = useCallback(() => {
        setAccordion(prev => ({
            ...prev,
            currentValue: 1,
        }));

        setCurrentData(1);
    }, []);

    return {
        toggleAccordion,
        onCurrentCategoryChange,
        onCharacterCLick,
        data,
        dataInfo,
        accordion,
    };
}

export default useData;
