function getYieldForPlant(crop, environmentFactors) {
	if (environmentFactors === undefined) {
		return crop.yield;
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
	const sunValue = valueCalculation(crop.factor.sun[sunFactor]);

	// rain factors
	const rainFactor = environmentFactors.rain;
	const rainValue = valueCalculation(crop.factor.rain[rainFactor]);

	// // wind factors
	// const windFactor = environmentFactors.wind;
	// const windValue = valueCalculation(vegetable.factor.wind[windFactor]);
	let YieldForPlantFactor = crop.yield * sunValue * rainValue; //* windValue;
	return YieldForPlantFactor;
}

function getYieldForCrop(input, environmentFactors) {
	if (environmentFactors === undefined) {
		let yieldForCrop = getYieldForPlant(input.crop) * input.numCrops;
		return yieldForCrop;
	}
	let yieldForCropFactor =
		getYieldForPlant(input.crop, environmentFactors) * input.numCrops;
	return yieldForCropFactor;
}

const getTotalYield = function (crops, environmentFactors) {
	if (environmentFactors === undefined) {
		let total = 0;
		crops.crops.forEach((crop) => {
			total += getYieldForCrop(crop);
		});
		return total;
	}
	let total = 0;
	crops.crops.forEach((crop) => {
		total += getYieldForCrop(crop, environmentFactors);
	});
	return total;
};

function getCostsForCrop(input) {
	let costs = input.costs * input.numCrops;
	// include environmental factors
	return costs;
}

function getRevenueForCrop(input) {
	// include environmental factors

	let revenue = getYieldForCrop(input) * input.salePrice;
	return revenue;
}

function getProfitForCrop(input) {
	let revenueForCrop = getRevenueForCrop(input);
	let costForCrop = getCostsForCrop(input);
	let profit = (revenueForCrop -= costForCrop);
	return profit;
}

function getTotalProfit(crops) {
	// include environmental factors
	let totalProfit = 0;
	crops.crops.forEach((crop) => {
		totalProfit += getProfitForCrop(crop);
	});
	return totalProfit;
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
