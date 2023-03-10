import ErrorMessage from "../../errorMessage/ErrorMessage";
import { Link, useNavigate, redirect } from "react-router-dom";

import ReturnButton from "../../returnButton/ReturnButton";
// import arrow from "../../../resources/down-arrow-2.png";

import "./404.scss";

const Page404 = () => {
    const navigate = useNavigate();

    return (
        <div className="error__page">
            <ErrorMessage />

            <div className="error__page__controls">
                <ReturnButton
                    title={"Return Back"}
                    redirect={() => navigate(-1)}
                />
                {/* <ReturnButton
                    title={"Back to HomePage"}
                    redirect={() => navigate("/")}
                /> */}
            </div>
        </div>
    );
};

export default Page404;
