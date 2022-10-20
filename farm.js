function getYieldForPlant(crop) {
	return crop.yield;
}
function getYieldForCrop(input) {
	let yieldForCrop = getYieldForPlant(input) * input.numCrops;
	return yieldForCrop;
}

const getTotalYield = function (crops) {
	let total = 0;
	crops.crops.forEach((crop) => {
		total += getYieldForCrop(crop);
	});
	return total;
};

function getCostsForCrop(crop) {
	// include environmental factors
	return crop.costs * crop.numCrops;
}

function getRevenueForCrop(crop) {
	// include environmental factors
	let revenue = getYieldForCrop(crop) * crop.saleprice;
	return revenue;
}

// function getProfitForCrop(crop) {
// 	let profit = getRevenueForCrop(crop) -= getCostsForCrop(crop);
// 	return profit;
// }

// function getTotalProfit{
// // include environmental factors
// }

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	// getProfitForCrop,
};
