import React from 'react';

import rickAndMortyMain from '../../resources/rick-and-morty-main.png';
import './salutation.scss';

function Salutation() {
    return (
        <div className="salutation">
            <div className="salutation-content">
                <h1>Rick & Morty API</h1>
                <p>Find your favorites rick and morty characters, episodes and locations.</p>
            </div>
            <div className="salutation-image">
                <img className="rick-and-morty__main-image" src={rickAndMortyMain} alt="Rick and Morty" />
            </div>
        </div>
    );
}

export default Salutation;
