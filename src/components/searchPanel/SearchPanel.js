import "./search-panel.scss";

const SearchPanel = ({ query, setQuery }) => {
    return (
        <div className="search-panel">
            <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search for characters"
                className="search-panel__input"
            />
        </div>
    );
};

export default SearchPanel;
