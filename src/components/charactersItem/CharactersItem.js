import "./characters-list-item.scss";

const CharactersItem = ({ id, name, location, thumbnail }) => {
    console.log(id, name, location, thumbnail);

    return (
        <div className="characters-list__item">
            <div className="characters-list__item-avatar">
                <img src={thumbnail} alt={name} />
            </div>

            <div className="characters-list__item-info">
                <h2>{name}</h2>
                {location}
            </div>
        </div>
    );
};

export default CharactersItem;
