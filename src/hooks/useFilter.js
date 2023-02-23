import { useState } from "react";

const useFilter = () => {
    const [currentCategory, setCurrentCategory] = useState("");

    const onCategoryCheck = (category) => {
        if (currentCategory === category) {
            setCurrentCategory("");
        } else {
            setCurrentCategory(category);
        }

        // console.log("currentCategory-->", currentCategory);
    };

    return {
        onCategoryCheck,
        currentCategory,
        setCurrentCategory,
    };
};

export default useFilter;
