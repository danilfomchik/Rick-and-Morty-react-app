import { Link } from "react-router-dom";

import "./characters-list-item.scss";

const CharactersItem = ({
    id,
    name,
    location,
    thumbnail,
    species,
    status,
    page,
    onCharacterCLick,
}) => {
    // console.log(species, status);

    let charStatus = "characters-list__item-status";

    if (status === "Alive") {
        charStatus += " alive";
    } else if (status === "Dead") {
        charStatus += " dead";
    } else {
        charStatus = charStatus;
    }

    return (
        <Link
            className="characters-list__item"
            to={`${page}${id}`}
            onClick={onCharacterCLick}
        >
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
                    <p>Last known location:</p>
                    <span>{location}</span>
                </div>
            </div>
        </Link>
    );
};

export default CharactersItem;
