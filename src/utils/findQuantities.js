function findQuantities(dataset) {
    let quantities = new Array(60).fill(0);

    for (let currentNumber = 0; currentNumber < 60; currentNumber++) {
        for (let datasetIndex = 0; datasetIndex < dataset.length; datasetIndex++) {
            for (let datasetNumberIndex = 0; datasetNumberIndex < 6; datasetNumberIndex++) {
                if (dataset[datasetIndex].bolas[datasetNumberIndex] === currentNumber + 1) {
                    quantities[currentNumber]++;
                    break;
                }
            }
        }
    }
    return quantities;
}

export default findQuantities