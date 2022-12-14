function getYieldForPlant(input, environmentFactors) {
	if (environmentFactors === undefined) {
		return input.yield;
	}

	valueCalculation = (factor) => {
		if (factor === undefined) {
			return 1;
		} else {
			return (100 + factor) / 100;
		}
	};

	// sun factors
	const sunFactor = environmentFactors.sun;
	const sunValue = valueCalculation(input.factor.sun[sunFactor]);

	// rain factors
	const rainFactor = environmentFactors.rain;
	const rainValue = valueCalculation(input.factor.rain[rainFactor]);

	// // wind factors
	// const windFactor = environmentFactors.wind;
	// const windValue = valueCalculation(vegetable.factor.wind[windFactor]);
	let yieldForPlantFactor = input.yield * sunValue * rainValue; //* windValue;
	return yieldForPlantFactor;
}

function getYieldForCrop(input, environmentFactors) {
	if (environmentFactors === undefined) {
		let yieldForCrop = getYieldForPlant(input.crop) * input.numCrops;
		return Math.round(yieldForCrop);
	}
	let yieldForCropFactor =
		getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
	return Math.round(yieldForCropFactor);
}

const getTotalYield = function ({ crops, environmentFactors }) {
	if (environmentFactors === undefined) {
		let total = 0;
		crops.forEach((crop) => {
			total += getYieldForCrop(crop);
		});
		return Math.round(total);
	}
	let total = 0;
	crops.forEach((crop) => {
		total += getYieldForCrop(crop, environmentFactors);
	});
	return Math.round(total);
};

function getCostsForCrop(input) {
	let costs = input.costs * input.numCrops;
	return costs;
}

function getRevenueForCrop({ input, environmentFactors }) {
	// include environmental factors
	if (environmentFactors === undefined) {
		let revenue = getYieldForCrop(input) * input.salePrice;
		return Math.round(revenue);
	}
	let revenueWithFactor =
		getYieldForCrop(input, environmentFactors) * input.salePrice;
	return Math.round(revenueWithFactor);
}

function getProfitForCrop({ input, environmentFactors }) {
	if (environmentFactors === undefined) {
		return getRevenueForCrop({ input }) - getCostsForCrop(input);
	}
	return (
		getRevenueForCrop({ input, environmentFactors }) - getCostsForCrop(input)
	);
}

function getTotalProfit({ input, environmentFactors }) {
	//console.log(input);
	if (environmentFactors === undefined) {
		let totalProfit = 0;
		input.forEach((input) => {
			totalProfit += getProfitForCrop({ input });
		});
		return totalProfit;
	}
	let totalProfitFactor = 0;
	input.forEach((input) => {
		totalProfitFactor += getProfitForCrop({ input, environmentFactors });
	});
	return Math.round(totalProfitFactor);
}

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit,
};
