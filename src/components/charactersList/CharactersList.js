import {memo} from 'react';

import CharactersItem from '../charactersItem/CharactersItem';
import ErrorMessage from '../errorMessage/ErrorMessage';
import Spinner from '../spinner/Spinner';
import './characters-list.scss';

const CharactersList = ({data, loading, error}) => {
    return (
        <>
            <div className="characters-list">
                {loading && <Spinner />}
                {error && (
                    <div className="error-component">
                        <ErrorMessage />

                        <h2>Something went wrong...</h2>
                    </div>
                )}

                {!loading && !error && data.length === 0 && (
                    <div className="error-component">
                        <h2>No items to display...</h2>
                    </div>
                )}

                {!loading && !error && data.map(char => <CharactersItem char={char} key={char.id} />)}
            </div>
        </>
    );
};

export default memo(CharactersList);
