import './Loading.css';

function Loading () {
    return (
        <div className="loading">
            <div className="lds-ring"><div></div><div></div><div></div><div></div></div>
            <h1>Carregando...</h1>
        </div>
    );
}

export default Loading