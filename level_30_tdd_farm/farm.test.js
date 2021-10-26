const {
    getCostsForCrop,
    getRevenueForCrop,
    getProfitForCrop,
    getTotalProfit,
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield
} = require("./farm.js");

//test variables
const corn = {
    name: "corn",
    cost: 1, 
    salePrice: 3,
    yield: 30,

    factors: { 
        sun: {
            low: -50,
            medium: 0,
            high: 50,
        }
    },
};

const pear = {
    name: "pear",
    cost: 0.75,  
    salePrice: 2, 
    yield: 5,

    factors: { 
        sun: {
            low: -60,
            medium: 0,
            high: 40,
        },
        temperature: {
            low: -40,
            medium: 20,
            high: 10,
        },
        ground: {
            low: 0,
            medium: 45,
            high: -25,
        },
    },
};

const avocado = {
    name: "avocado",
    cost: 5,  
    salePrice: 5, 
    yield: 6, 

    factors: { 
        sun: {
            low: -20,
            medium: 0,
            high: 50,
        },
        wind: {
            low: 0,
            medium: -30,
            high: -60,
        },
    },
};

const environment_factors = {
    sun: "low",
    wind: "high",
    temperature: "low",
    ground: "medium"
};

//tests without environment factors 
test("Get costs per crop", () => {

    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: pear, num_crops: 2 },
        { crop: avocado, num_crops: 7 }
    ];

    const expected = [5, 1.50, 35];
    const output = crops.map(plant => getCostsForCrop(plant));
    expect(output).toEqual(expected);
});

test("Get revenue per crop", () => {

    const crops = [
        { crop: corn, num_crops: 15 },
        { crop: pear, num_crops: 8 },
        { crop: avocado, num_crops: 47 }
    ];

    const expected = [1350, 80, 1410];
    const output = crops.map(plant => getRevenueForCrop(plant));
    expect(output).toEqual(expected);
});

test("Get profit per crop", () => {

    const crops = [
        { crop: corn, num_crops: 16 },
        { crop: pear, num_crops: 20 },
        { crop: avocado, num_crops: 8 }
    ];

    const expected = [1424, 185, 200];
    const output = crops.map(plant => getProfitForCrop(plant));
    expect(output).toEqual(expected);
});

test("Get total profit for all crops", () => {

    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: pear, num_crops: 150 },
        { crop: avocado, num_crops: 67 }
    ];

    const expected = 3507.50;
    const output = getTotalProfit(crops);
    expect(output).toEqual(expected);
});

test("Get yield for plant with no environment factors", () => {

    expect(getYieldForPlant(corn)).toBe(30);
    expect(getYieldForPlant(pear)).toBe(5);
    expect(getYieldForPlant(avocado)).toBe(6);
});

test("Get yield for crop with no environment factors", () => {

    const crops = {
        crop: corn,
        num_crops: 10,
    };

    expect(getYieldForCrop(crops)).toBe(300);
});

test("Calculate total yield with multiple crops", () => {

    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    const crops = [
        { crop: corn, num_crops: 5 },
        { crop: pumpkin, num_crops: 2 },
    ];

    expect(getTotalYield(crops)).toBe(158);
});

test("Calculate total yield with 0 amount", () => {

    const crops = [{ crop: corn, num_crops: 0 }];
    expect(getTotalYield(crops)).toBe(0);
});

//tests with environment factors
test("Get yield for plant with environment factors", () => {

    const pumpkin = {
        name: "pumpkin",
        yield: 4,
    };

    expect(getYieldForPlant(pumpkin, environment_factors)).toBe(4);
    expect(getYieldForPlant(corn, environment_factors)).toBe(15);
    expect(getYieldForPlant(pear, environment_factors)).toBe(1.74);
    expect(getYieldForPlant(avocado, environment_factors)).toBe(1.92);
});

test("Get yield for crop with environment factors", () => {

    const crops = {
        crop: corn,
        num_crops: 10,
    };

    expect(getYieldForCrop(crops, environment_factors)).toBe(150);
});

test("Get profit per crop", () => {

    const crops = [
        { crop: corn, num_crops: 16 },
        { crop: pear, num_crops: 20 },
        { crop: avocado, num_crops: 8 }
    ];

    const expected = [704, 54.60, 36.80];
    const output = crops.map(plant => getProfitForCrop(plant, environment_factors));
    expect(output).toEqual(expected);
});

test("Get total profit for all crops", () => {

    const crops = [
        { crop: corn, num_crops: 16 },
        { crop: pear, num_crops: 20 },
        { crop: avocado, num_crops: 8 }
    ];

    const expected = 795.40;
    const output = getTotalProfit(crops, environment_factors);
    expect(output).toEqual(expected);
});