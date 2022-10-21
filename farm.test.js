const { RawDescriptionHelpFormatter } = require("argparse");
const { describe } = require("yargs");
const {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
} = require("./farm");

describe("getYieldForPlant", () => {
	const corn = {
		name: "corn",
		yield: 30,
	};

	test("Get yield for plant with no environment factors", () => {
		expect(getYieldForPlant(corn)).toBe(30);
	});
});

describe("getYieldForCrop", () => {
	test("Get yield for crop, simple", () => {
		const corn = {
			name: "corn",
			yield: 3,
		};
		const input = {
			crop: corn,
			numCrops: 10,
		};
		expect(getYieldForCrop(input)).toBe(30);
	});
});

describe("getTotalYield", () => {
	test("Calculate total yield with multiple crops", () => {
		const corn = {
			name: "corn",
			yield: 3,
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 4,
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 },
		];
		expect(getTotalYield({ crops })).toBe(23);
	});

	test("Calculate total yield with 0 amount", () => {
		const corn = {
			name: "corn",
			yield: 3,
		};
		const crops = [{ crop: corn, numCrops: 0 }];
		expect(getTotalYield({ crops })).toBe(0);
	});
});

describe("getCostsForCrop", () => {
	test("Calculate total cost per crop", () => {
		const mais = {
			name: "mais",
			yield: 3,
		};

		const input = {
			crop: mais,
			numCrops: 230,
			costs: 1,
		};
		const crop = [{ crop: mais, numCrops: 230, costs: 1 }];
		expect(getCostsForCrop(input)).toBe(230);
	});
});

describe("getRevenueForCrop", () => {
	test("Calculate revenue for crop", () => {
		const apple = {
			name: "apple",
			yield: 5,
		};

		const input = {
			crop: apple,
			numCrops: 5,
			salePrice: 2,
		};
		const crop = [{ crop: apple, salePrice: 2 }];
		expect(getRevenueForCrop(input)).toBe(10);
	});
});

describe("getProfitForCrop", () => {
	test("Calculate profit for crop", () => {
		const apple = {
			name: "apple",
			yield: 5,
		};

		const input = {
			crop: apple,
			numCrops: 1,
			costs: 1,
			saleprice: 2,
		};

		expect(getProfitForCrop(input)).toBe(5);
	});
});

describe("getTotalProfit");
