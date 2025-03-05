import React, {useCallback, useEffect, useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';

import useApi from '../../../services/useApi';
import ReturnButton from '../../returnButton/ReturnButton';
import Spinner from '../../spinner/Spinner';
import Page404 from '../errorPage/404';
import './single-character-page.scss';

function SingleCharacterPage() {
    const {charId} = useParams();
    const [characterInfo, setCharacterInfo] = useState({});

    const {error, loading, getSingleCharacter} = useApi();

    const onLoadSingleCharacter = useCallback(async () => {
        const responseData = await getSingleCharacter(charId);

        setCharacterInfo(responseData);
    }, [charId, getSingleCharacter]);

    useEffect(() => {
        onLoadSingleCharacter();
    }, [onLoadSingleCharacter]);

    const errorMessage = error && <Page404 />;
    const spinner = loading && <Spinner />;
    const content = !loading && !error && <View character={characterInfo} />;

    return (
        <div className="single-character">
            {content}
            {spinner}
            {errorMessage}
        </div>
    );
}

const View = ({character}) => {
    const {name, thumbnail, status, species, gender, origin, location} = character;
    const navigate = useNavigate();

    return (
        <>
            <ReturnButton title={'Return Back'} redirect={() => navigate(-1)} />

            <div className="characters-list__item">
                <div className="characters-list__item-avatar">
                    <img src={thumbnail} alt={name} />
                </div>

                <div className="characters-list__item-info">
                    <h2>{name}</h2>
                    <div className={`characters-list__item-status ${status ? status.toLowerCase() : ''}`}>
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
