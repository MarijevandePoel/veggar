function getYieldForPlant(crop) {
	return crop.yield;
}
function getYieldForCrop(input) {
	let yieldForCrop = getYieldForPlant(input.crop) * input.numCrops;
	return yieldForCrop;
}

const getTotalYield = function (crops) {
	let total = 0;
	crops.crops.forEach((crop) => {
		total += getYieldForCrop(crop);
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
	let yieldFromPLant = input.crop.yield;
	let revenue = yieldFromPLant * input.salePrice;
	return revenue;
}

function getProfitForCrop(input) {
	let revenueForCrop = getRevenueForCrop(input.crop.yield);
	let costForCrop = getCostsForCrop(input.crop.costs);
	let profit = (revenueForCrop -= costForCrop);
	return profit;
}

// function getTotalProfit{
// // include environmental factors
// }

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
};
