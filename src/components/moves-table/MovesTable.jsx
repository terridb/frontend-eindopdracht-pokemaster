import "./MovesTable.css";
import GeneralButton from "../general-button/GeneralButton.jsx";
import MovesTableItem from "../moves-table-item/MovesTableItem.jsx";

function MovesTable({handleLoadMore, movesList, counter, loading, moreAvailable}) {
    return (
        <div className="moves-list">
            <table className="result-table">
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Type</th>
                    <th>Power</th>
                    <th>Acc</th>
                    <th>PP</th>
                </tr>
                </thead>
                <tbody>
                {movesList.slice(0, counter).map((move, index) => (
                    <MovesTableItem
                        key={index}
                        endpoint={move.url}
                    />
                ))}
                </tbody>
            </table>
            <section className="load-more-section">
                {!loading && moreAvailable && (
                    <GeneralButton buttonText="Load more" onClick={handleLoadMore}/>
                )}
            </section>
        </div>
    );
}

export default MovesTable;