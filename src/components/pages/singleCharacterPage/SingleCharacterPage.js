import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

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

    return (
        // Gender : Male
        // Location: Citadel of Ricks
        // Origin: Earth (C-137)

        // <div className="single-character">
        //     <h1>{characterInfo.name}</h1>

        //     <div className="single-character__info">
        //         <div className="characters-list__item-avatar">
        //             <img
        //                 src={characterInfo.thumbnail}
        //                 alt={characterInfo.name}
        //             />
        //         </div>

        //         <div className="characters-list__item-info">
        //             {/* <h2>{characterInfo.name}</h2> */}
        //             <div className={charStatus}>
        //                 <span>
        //                     {characterInfo.status} - {characterInfo.species}
        //                 </span>
        //             </div>
        //             <div className="">
        //                 <p>Last known location:</p>
        //                 <span>{characterInfo.location}</span>
        //             </div>
        //         </div>
        //     </div>
        // </div>

        <div className="single-character">
            <div className="characters-list__item">
                <div className="characters-list__item-avatar">
                    <img
                        src={characterInfo.thumbnail}
                        alt={characterInfo.name}
                    />
                </div>

                <div className="characters-list__item-info">
                    <h2>{characterInfo.name}</h2>
                    <div className={charStatus}>
                        <span>
                            {characterInfo.status} - {characterInfo.species}
                        </span>
                    </div>
                    <div className="characters-list__item-location">
                        <p>Gender:</p>
                        <span>{characterInfo.gender}</span>
                    </div>
                    <div className="characters-list__item-location">
                        <p>Origin:</p>
                        <span>{characterInfo.origin}</span>
                    </div>
                    <div className="characters-list__item-location">
                        <p>Last known location:</p>
                        <span>{characterInfo.location}</span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SingleCharacterPage;
