import React from "react";
import { useNavigate } from "react-router-dom";

import arrow from "../../resources/left-arrow.png";

import "./return-btn.scss";

function ReturnButton({ title }) {
    const navigate = useNavigate();

    return (
        <div className="return-back__btn" onClick={() => navigate(-1)}>
            <span>{title}</span>
            <img src={arrow} className="arrow" alt="Arrow" />
        </div>
    );
}

export default ReturnButton;
