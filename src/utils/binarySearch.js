function binarySearch(searchValue, datasetSize, parseFunction) {
    let initalPosition = 0;
    let finalPosition = datasetSize - 1;
    let middle;
    let currentValue;

    while(initalPosition <= finalPosition) {
        middle = parseInt((initalPosition + finalPosition) / 2);
        currentValue = parseFunction(middle);

        if (currentValue === searchValue) return middle;
        if (currentValue > searchValue) finalPosition = middle - 1;
        if (currentValue < searchValue) initalPosition = middle + 1;
    }

    return middle;
}

export default binarySearch