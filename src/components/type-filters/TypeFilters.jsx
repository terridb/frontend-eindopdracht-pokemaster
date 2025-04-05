import TypeCard from "../type-card/TypeCard.jsx";
import "./TypeFilters.css";

function TypeFilters() {
    return (
        <div className="filter-section-types">
            <h3>Type</h3>
            <ul className="filter-section-types-grid">
                <TypeCard
                    pokemonType="normal"
                    type="type"
                />
                <TypeCard
                    pokemonType="fire"
                    type="type"
                />
                <TypeCard
                    pokemonType="fighting"
                    type="type"
                />
                <TypeCard
                    pokemonType="water"
                    type="type"
                />
                <TypeCard
                    pokemonType="flying"
                    type="type"
                />
                <TypeCard
                    pokemonType="grass"
                    type="type"
                />
                <TypeCard
                    pokemonType="poison"
                    type="type"
                />
                <TypeCard
                    pokemonType="electric"
                    type="type"
                />
                <TypeCard
                    pokemonType="ground"
                    type="type"
                />
                <TypeCard
                    pokemonType="psychic"
                    type="type"
                />
                <TypeCard
                    pokemonType="rock"
                    type="type"
                />
                <TypeCard
                    pokemonType="ice"
                    type="type"
                />
                <TypeCard
                    pokemonType="bug"
                    type="type"
                />
                <TypeCard
                    pokemonType="dragon"
                    type="type"
                />
                <TypeCard
                    pokemonType="ghost"
                    type="type"
                />
                <TypeCard
                    pokemonType="dark"
                    type="type"
                />
                <TypeCard
                    pokemonType="steel"
                    type="type"
                />
                <TypeCard
                    pokemonType="fairy"
                    type="type"
                />
            </ul>
        </div>
    );
}

export default TypeFilters;