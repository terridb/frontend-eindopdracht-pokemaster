import TypeCard from "../type-card/TypeCard.jsx";
import "./TypeFilters.css";

function TypeFilters() {
    return (
        <div className="filter-section-types">
            <h3>Type</h3>
            <ul className="filter-section-types-grid">
                <TypeCard
                    pokemonType="normal"
                    button={true}
                />
                <TypeCard
                    pokemonType="fire"
                    button={true}
                />
                <TypeCard
                    pokemonType="fighting"
                    button={true}
                />
                <TypeCard
                    pokemonType="water"
                    button={true}
                />
                <TypeCard
                    pokemonType="flying"
                    button={true}
                />
                <TypeCard
                    pokemonType="grass"
                    button={true}
                />
                <TypeCard
                    pokemonType="poison"
                    button={true}
                />
                <TypeCard
                    pokemonType="electric"
                    button={true}
                />
                <TypeCard
                    pokemonType="ground"
                    button={true}
                />
                <TypeCard
                    pokemonType="psychic"
                    button={true}
                />
                <TypeCard
                    pokemonType="rock"
                    button={true}
                />
                <TypeCard
                    pokemonType="ice"
                    button={true}
                />
                <TypeCard
                    pokemonType="bug"
                    button={true}
                />
                <TypeCard
                    pokemonType="dragon"
                    button={true}
                />
                <TypeCard
                    pokemonType="ghost"
                    button={true}
                />
                <TypeCard
                    pokemonType="dark"
                    button={true}
                />
                <TypeCard
                    pokemonType="steel"
                    button={true}
                />
                <TypeCard
                    pokemonType="fairy"
                    button={true}
                />
            </ul>
        </div>
    );
}

export default TypeFilters;