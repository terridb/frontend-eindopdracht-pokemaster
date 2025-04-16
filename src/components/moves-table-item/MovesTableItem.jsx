import "./MovesTableItem.css";
import TypeCard from "../type-card/TypeCard.jsx";
import {useEffect, useState} from "react";
import axios from "axios";
import {capitalizeFirstLetter} from "../../helpers/changeText.js";

function MovesTableItem({endpoint}) {
    const [loading, toggleLoading] = useState(false);
    const [error, setError] = useState(null);
    const [move, setMove] = useState({});

    useEffect(() => {
        const fetchMoveData = async () => {
            toggleLoading(true);
            setError(null);

            try {
                const response = await axios.get(endpoint);
                setMove(response.data);
            } catch (err) {
                console.error(err);
                setError(err);
            } finally {
                toggleLoading(false);
            }
        }
        fetchMoveData();

    }, [endpoint]);

    if (loading) {
        return (
            <tr className="table-item">
                <td>Loading...</td>
                <td className="result-table-stats"></td>
                <td className="result-table-stats"></td>
                <td className="result-table-stats"></td>
                <td className="result-table-stats"></td>
            </tr>
        )
    }

    if (error) {
        return (
            <tr className="table-item">
                <td>Error: {error.message}</td>
                <td className="result-table-stats"></td>
                <td className="result-table-stats"></td>
                <td className="result-table-stats"></td>
                <td className="result-table-stats"></td>
            </tr>
        )
    }

    if (move) {
        return (
            <tr className="table-item">
                <td>{capitalizeFirstLetter((move?.name || "").replaceAll("-", " "))}</td>
                <td>
                    <div className="cell-type-container">
                        <TypeCard pokemonType={move?.type?.name}/>
                    </div>
                </td>
                <td className="result-table-stats">{move?.power}</td>
                <td className="result-table-stats">{move?.accuracy}</td>
                <td className="result-table-stats">{move?.pp}</td>
            </tr>
        )
    }
}

export default MovesTableItem;