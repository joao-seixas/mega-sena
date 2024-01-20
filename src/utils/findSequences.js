function findSequences(dataset) {
    let sequencesFound = [[], [], [], [], [], []];
    let sequencesSize;

    for(let index = 0; index < dataset.length; index++) {
        sequencesSize = 0;
        for (let bola = 0; bola < 6;) {
            if ((dataset[index].bolas[bola] + 1) === dataset[index].bolas[++bola]) sequencesSize++; else
                if (sequencesSize > 0) {
                    sequencesFound[sequencesSize].push(dataset[index]);
                    sequencesSize = 0;
                }
        }
    }
    sequencesFound[0] = dataset;
    sequencesFound[1] = [...new Set(sequencesFound[1])];
    
    return sequencesFound;
}

export default findSequences