import "./AlertBox.css";

function AlertBox({message}) {
    return (
        <div className="alert-box">
            <p>{message}</p>
        </div>
    );
}

export default AlertBox;