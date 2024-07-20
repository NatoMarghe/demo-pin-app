const calculateAverage = async (data) => {
    const total = data.clientes.reduce((acc, curr) => acc + curr.edad, 0);
    console.log("total promedio ", total);
    return await total / data.clientes.length;
};

const calculateStandardDeviation = async (ages) => {
    const n = ages.clientes.length;
    const mean = ages.clientes.reduce((acc, age) => acc + age.edad, 0) / n;
    
    const squaredDifferencesSum = ages.clientes.reduce((acc, age) => {
        return acc + Math.pow(age.edad - mean, 2);
    }, 0);
    
    const variance = squaredDifferencesSum / (n - 1);
    console.log("variance desviacion ", variance);
    console.log("desviacion ", Math.sqrt(variance));
    return await Math.sqrt(variance);
};

const getIdMax = async (data) => {
    return await data.clientes.reduce((previous, current) => {
        return current.id > previous.id ? current : previous;
    });

}

module.exports = {calculateStandardDeviation, calculateAverage, getIdMax}