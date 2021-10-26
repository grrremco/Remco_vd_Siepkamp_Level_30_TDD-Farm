const getYieldForPlant = (plant, environment_factors) => {
    const getPlantSensitivity = plant.factors;
    const arrayOfDecimals = [];

    //checks if environment factors are present && whether plant is sensitive to factors
    if (environment_factors && getPlantSensitivity) {

        Object.keys(getPlantSensitivity).forEach(keyWord => {
            //checks for match(es) between plant sensitivity & environment factors
            if (Object.keys(environment_factors).includes(keyWord)) {

                //returns low, medium or high
                const factorIntensity = environment_factors[`${keyWord}`];

                //returns percentage of impact factor has on plant
                const factorImpact = getPlantSensitivity[`${keyWord}`][`${factorIntensity}`];

                //converts percentage to decimal number
                const decimalNumber = (100 + factorImpact) / 100;
                arrayOfDecimals.push(decimalNumber);
            }
        });

        //multiplies original plant yield by impact decimalNumber(s)
        let impactedYield = arrayOfDecimals.reduce((acumulator, currentValue) => {
            return acumulator * currentValue;
        }, plant.yield);

        //rounds up to 2 decimals when necessary
        impactedYield = Math.round((impactedYield + Number.EPSILON) * 100) / 100;

        return impactedYield;
    } else {

        return plant.yield;
    }

};

const getYieldForCrop = (crop, environment_factors) => {
    const cropYield = crop.num_crops * getYieldForPlant(crop.crop, environment_factors);

    //line is used throughout to avoid math errors with floating point numbers
    return Math.round((cropYield + Number.EPSILON) * 100) / 100;
};

const getTotalYield = (arrayOfCrops, environment_factors) => {
    const cropYield = arrayOfCrops.map(crop => getYieldForCrop(crop, environment_factors));
    const totalYield = cropYield.reduce((acumulator, currentValue) => acumulator + currentValue);

    return Math.round((totalYield + Number.EPSILON) * 100) / 100;
};

const getCostsForCrop = (crop) => {
    const cost = crop.crop.cost;
    const crops = crop.num_crops;

    return Math.round(((cost * crops) + Number.EPSILON) * 100) / 100;
};

const getRevenueForCrop = (crop, environment_factors) => {
    const cropYield = getYieldForCrop(crop, environment_factors);
    const salePrice = crop.crop.salePrice;

    return Math.round(((salePrice * cropYield) + Number.EPSILON) * 100) / 100;
};

const getProfitForCrop = (crop, environment_factors) => {
    const cost = getCostsForCrop(crop);
    const revenue = getRevenueForCrop(crop, environment_factors);

    return Math.round(((revenue - cost) + Number.EPSILON) * 100) / 100;
};

const getTotalProfit = (arrayOfCrops, environment_factors) => {
    const cropProfit = arrayOfCrops.map(crop => getProfitForCrop(crop, environment_factors));
    const totalProfit = cropProfit.reduce((acumulator, currentValue) => acumulator + currentValue);

    return Math.round((totalProfit + Number.EPSILON) * 100) / 100;
};

module.exports = {
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
};