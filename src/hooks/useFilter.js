import { useState, useRef } from "react";

const useFilter = () => {
    const currentValue = useRef("");

    const onCategoryCheck = (newCategory) => {
        console.log(newCategory);

        if (currentValue.current === newCategory) {
            currentValue.current = "";
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
