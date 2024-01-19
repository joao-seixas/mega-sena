function findSequences(dataset) {
    let sequenciasEncontradas = [[], [], [], [], [], []];
    let tamanhoSequencia;

    for(let sorteio = 0; sorteio < dataset.length; sorteio++) {
        tamanhoSequencia = 0;
        for (let bola = 0; bola < 6;) {
            if ((dataset[sorteio].bolas[bola] + 1) === dataset[sorteio].bolas[++bola]) tamanhoSequencia++; else
                if (tamanhoSequencia > 0) {
                    sequenciasEncontradas[tamanhoSequencia].push(dataset[sorteio]);
                    tamanhoSequencia = 0;
                }
        }
    }
    sequenciasEncontradas[0] = dataset;
    sequenciasEncontradas[1] = [...new Set(sequenciasEncontradas[1])];
    
    return sequenciasEncontradas;
}

export default findSequences