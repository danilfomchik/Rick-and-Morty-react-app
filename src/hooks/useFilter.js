import { useState, useRef } from "react";

const useFilter = () => {
    const currentCategory = useRef("");

    const onCategoryCheck = (newCategory) => {
        if (currentCategory.current === newCategory) {
            currentCategory.current = "";
        } else {
            currentCategory.current = newCategory;
        }
    };

    return {
        onCategoryCheck,
        currentCategory,
    };
};

export default useFilter;
