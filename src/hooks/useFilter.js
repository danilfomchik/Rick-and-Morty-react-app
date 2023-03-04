import { useState, useRef } from "react";

const useFilter = (initialValue) => {
    const currentValue = useRef(initialValue);

    const onCategoryCheck = (newCategory) => {
        console.log(currentValue.current, newCategory);

        if (currentValue.current === newCategory) {
            currentValue.current = initialValue;
        } else {
            currentValue.current = newCategory;
        }
    };

    return {
        onCategoryCheck,
        currentValue,
    };
};

export default useFilter;
