import './Premios.css';

function Premios({sorteio}) {
    const ganhadores = sorteio?.ganhadores.toLocaleString('pt-BR');
    const rateio = sorteio?.premio.toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    const total = rateio && (sorteio.premio * sorteio.ganhadores).toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    const acumulado = sorteio?.acumulado.toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    const ganhadoresQuina = sorteio?.ganhadoresQuina.toLocaleString('pt-BR');
    const rateioQuina = sorteio?.premioQuina.toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    const ganhadoresQuadra = sorteio?.ganhadoresQuadra.toLocaleString('pt-BR');
    const rateioQuadra = sorteio?.premioQuadra.toLocaleString('pt-BR', {style:"currency", currency:"BRL"});

    if (sorteio) return (
        <div className="premios">
            <div className="bold">
                {sorteio.ganhadores > 0 ? `${ganhadores}` : 'Sem ganhadores'}
                {sorteio.ganhadores === 1 && ` ganhador`}
                {sorteio.ganhadores > 1 && ` ganhadores - ${rateio}`}
            </div>
            <div>
                {sorteio.ganhadores ?
                    <span>Prêmio total: <span className="bold">{total}</span></span> :
                    <span>Prêmio acumulado: <span className="bold">{acumulado}</span></span>}
            </div>
            <div>
                Quina: {ganhadoresQuina} ganhadores - <span className="bold">{rateioQuina}</span>
            </div>
            <div>
                Quadra: {ganhadoresQuadra} ganhadores - <span className="bold">{rateioQuadra}</span>
            </div>
        </div>
    ); else return (
        <div className="premios">
            Nenhum concurso encontrado
        </div>
    );
}

export default Premios