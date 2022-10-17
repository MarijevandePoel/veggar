function getYieldForPlant(crop) {
	return crop.yield;
}
function getYieldForCrop(input) {
	return input.crop.yield * input.numCrops;
}

const getTotalYield = function (crops) {
	let total = 0;
	Array.from(crops).forEach((crop) => {
		return (total += getYieldForCrop);
	});
};

module.exports = {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
};
