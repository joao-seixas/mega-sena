import './Premios.css';

function Premios({sorteio}) {
    const ganhadores = sorteio?.['Ganhadores 6 acertos'];
    const rateio = sorteio?.['Rateio 6 acertos'].replace('R$', 'R$ ');
    const total = rateio && (parseFloat(rateio.replace('R$ ', '').replaceAll('.', '').replace(',', '.')) * ganhadores).toLocaleString('pt-BR', {style:"currency", currency:"BRL"});
    const acumulado = sorteio?.['Acumulado 6 acertos'].replace('R$', 'R$ ');
    const ganhadoresQuina = sorteio?.['Ganhadores 5 acertos'].toLocaleString('pt-BR');
    const rateioQuina = sorteio?.['Rateio 5 acertos'].replace('R$', 'R$ ');
    const ganhadoresQuadra = sorteio?.['Ganhadores 4 acertos'].toLocaleString('pt-BR');
    const rateioQuadra = sorteio?.['Rateio 4 acertos'].replace('R$', 'R$ ');

    if (sorteio) return (
        <div className="premios">
            <div className="bold">
                {ganhadores > 0 ? `${ganhadores}` : 'Sem ganhadores'}
                {ganhadores === 1 && ` ganhador`}
                {ganhadores > 1 && ` ganhadores - ${rateio}`}
            </div>
            <div>
                {ganhadores ?
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