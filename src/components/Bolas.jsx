import './Bolas.css';

function Bolas ({bolas, callbackBola}) {
    const numeros =[
        [1, 2, 3, 4, 5, 6, 7, 8, 9, 10],
        [11, 12, 13, 14, 15, 16, 17, 18, 19, 20],
        [21, 22, 23, 24, 25, 26, 27, 28, 29, 30],
        [31, 32, 33, 34, 35, 36, 37, 38, 39, 40],
        [41, 42, 43, 44, 45, 46, 47, 48, 49, 50],
        [51, 52, 53, 54, 55, 56, 57, 58, 59, 60]
    ];

    return (
        <div className="outer-container">
        <div className="bolas">
            {numeros.map((linha, indice) =>
                <div key={indice} className="linha">
                    {linha.map((numero) =>
                        <div
                            key={numero}
                            className="bola"
                            data-numero={numero}
                            style={{
                                color: bolas[numero]?.cor,
                                backgroundColor: bolas[numero]?.background
                            }}
                            title={bolas[numero]?.title}
                            onClick={(e) => callbackBola && callbackBola(e.target.getAttribute('data-numero'))}
                        >
                            {numero}
                        </div>
                    )}
                </div>
            )}
        </div>
    </div>
    );
}

export default Bolas