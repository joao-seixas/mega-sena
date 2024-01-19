function filter(numbers, dataset) {
    let allFound;
    let oneFound;
    let newDataset = [];

    for (let datasetIndex = 0; datasetIndex < dataset.length; datasetIndex++) {
        allFound = true;
        for (let numbersIndex = 0; numbersIndex < numbers.length; numbersIndex++) {
            oneFound = false;
            for (let datasetNumbersIndex = 0; datasetNumbersIndex < 6; datasetNumbersIndex++) {
                if (numbers[numbersIndex] == dataset[datasetIndex].bolas[datasetNumbersIndex]) {
                    oneFound = true;
                    break;
                }
            }
            allFound = allFound && oneFound;
        }
        if(allFound) newDataset.push(dataset[datasetIndex]);
    }
    return newDataset;
}

export default filter
