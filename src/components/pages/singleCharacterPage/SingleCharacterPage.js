import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";

import Page404 from "../errorPage/404";
import Spinner from "../../spinner/Spinner";

import ReturnButton from "../../returnButton/ReturnButton";

import useApi from "../../../services/useApi";

import "./single-character-page.scss";

function SingleCharacterPage() {
    const { charId } = useParams();
    const [characterInfo, setCharacterInfo] = useState({});

    const { error, loading, getSingleCharacter } = useApi();

    useEffect(() => {
        getSingleCharacter(charId).then(setCharacterInfo);
    }, [charId]);

    let charStatus = "characters-list__item-status";

    if (characterInfo.status === "Alive") {
        charStatus += " alive";
    } else if (characterInfo.status === "Dead") {
        charStatus += " dead";
    } else {
        charStatus = charStatus;
    }

    const errorMessage = error && <Page404 />;

    const spinner = loading && <Spinner />;
    const content = !loading && !error && (
        <View character={characterInfo} charStatus={charStatus} />
    );

    return (
        <div className="single-character">
            {content}
            {spinner}
            {errorMessage}
        </div>
    );
}

const View = ({ character, charStatus }) => {
    const { name, thumbnail, status, species, gender, origin, location } =
        character;
    const navigate = useNavigate();

    return (
        <>
            <ReturnButton title={"Return Back"} redirect={() => navigate(-1)} />

            <div className="characters-list__item">
                <div className="characters-list__item-avatar">
                    <img src={thumbnail} alt={name} />
                </div>

                <div className="characters-list__item-info">
                    <h2>{name}</h2>
                    <div className={charStatus}>
                        <span>
                            {status} - {species}
                        </span>
                    </div>
                    <div className="characters-list__item-location">
                        <p>Gender:</p>
                        <span>{gender}</span>
                    </div>
                    <div className="characters-list__item-location">
                        <p>Origin:</p>
                        <span>{origin}</span>
                    </div>
                    <div className="characters-list__item-location">
                        <p>Last known location:</p>
                        <span>{location}</span>
                    </div>
                </div>
            </div>
        </>
    );
};

export default SingleCharacterPage;
