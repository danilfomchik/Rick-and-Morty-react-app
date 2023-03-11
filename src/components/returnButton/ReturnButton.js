import React from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../resources/down-arrow-2.png";

import "./return-btn.scss";

function ReturnButton({ title, redirect }) {
    const navigate = useNavigate();

    return (
        <div className="return-back__btn" onClick={() => navigate(-1)}>
            <span>{title}</span>
            <img src={arrow} alt="Arrow" />
        </div>
    );
}

export default ReturnButton;
