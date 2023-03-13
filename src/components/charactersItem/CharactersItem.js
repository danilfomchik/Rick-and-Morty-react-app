import { Link } from "react-router-dom";

import "./characters-list-item.scss";

const CharactersItem = ({ char, page, onCharacterCLick }) => {
    return (
        <Link
            className="characters-list__item"
            to={`${page}${char.id}`}
            onClick={onCharacterCLick}
        >
            <div className="characters-list__item-avatar">
                <img src={char.thumbnail} alt={char.name} />
            </div>

            <div className="characters-list__item-info">
                <h2>{char.name}</h2>
                <div
                    className={`characters-list__item-status ${char.status.toLowerCase()}`}
                >
                    <span>
                        {char.status} - {char.species}
                    </span>
                </div>
                <div className="characters-list__item-location">
                    <p>Last known location:</p>
                    <span>{char.location}</span>
                </div>
            </div>
        </Link>
    );
};

export default CharactersItem;
