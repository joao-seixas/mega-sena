function Data({dataString}) {
    const data = new Date(dataString?.split('/').reverse().join('-'));
    const diaSemana = [
        'Domingo',
        'Segunda-feira',
        'Terça-feira',
        'Quarta-feira',
        'Quinta-feira',
        'Sexta-feira',
        'Sábado'
    ];
    const meses = [
        'janeiro',
        'fevereiro',
        'março',
        'abril',
        'maio',
        'junho',
        'julho',
        'agosto',
        'setembro',
        'outubro',
        'novembro',
        'dezembro'
    ]

    if (dataString)
    return (
        <div className="main-menu">
            {diaSemana[data.getUTCDay()]}, {data.getUTCDate()}{data.getUTCDate() === 1 ? 'º' : ''} de {meses[data.getUTCMonth()]} de {data.getUTCFullYear()}
        </div>
    ); else
    return (<div>-</div>);
}

export default Data