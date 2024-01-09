import './Premios.css';

function Premios({sorteio}) {
    const ganhadores = sorteio ?
        sorteio['Ganhadores 6 acertos'] ?
            sorteio['Ganhadores 6 acertos'] > 1 ?
                `${sorteio['Ganhadores 6 acertos']} ganhadores` :
                `${sorteio['Ganhadores 6 acertos']} ganhador` :
            'Sem ganhadores' :
        'Nenhum concurso encontrado';

    const premio = sorteio ?
        sorteio['Ganhadores 6 acertos'] ?
            `Prêmio por ganhador: ${sorteio['Rateio 6 acertos'].replace('R$', 'R$ ')}` :
            `Prêmio acumulado: ${sorteio['Acumulado 6 acertos'].replace('R$', 'R$ ')}` :
        '';

    const quina = sorteio ?
        `Quina: ${sorteio['Ganhadores 5 acertos'].toLocaleString('pt-BR')} ganhadores - ${sorteio['Rateio 5 acertos'].replace('R$', 'R$ ')}` :
        '';

    const quadra = sorteio ?
        `Quadra: ${sorteio['Ganhadores 4 acertos']?.toLocaleString('pt-BR')} ganhadores - ${sorteio['Rateio 4 acertos']?.replace('R$', 'R$ ')}` :
        '';

    return (
        <div className="premios">
            <div>
                {ganhadores}
            </div>
            <div>
                {premio}
            </div>
            <div>
                {quina}
            </div>
            <div>
                {quadra}
            </div>
        </div>
    );
}

export default Premios