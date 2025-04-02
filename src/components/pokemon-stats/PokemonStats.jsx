import "./PokemonStats.css";

function PokemonStats({stats, type}) {
    return (
        <section className="pokemon-information-section stats">
            <ul className="pokemon-stats-list">
                <h3>Stats</h3>
                {stats.map((stat) => {
                    const statName =
                        stat.stat.name === "special-attack" ? "Sp. Attack" :
                            stat.stat.name === "special-defense" ? "Sp. Defense" :
                                stat.stat.name;

                    return (
                        <li key={stat.stat.name} className="stat-item">
                            <span className="stat-name">{statName}</span>
                            <span className="stat-value">{stat.base_stat}</span>
                            <div className="stat-bar">
                                <div className={`stat-fill pokemon-type-color ${type}`} style={{width: `${(stat.base_stat / 255) * 100}%`}}></div>
                            </div>
                        </li>
                    );
                })}
            </ul>
        </section>
    );
}

export default PokemonStats;