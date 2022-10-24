const {
	getYieldForPlant,
	getYieldForCrop,
	getTotalYield,
	getCostsForCrop,
	getRevenueForCrop,
	getProfitForCrop,
	getTotalProfit,
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

describe("getYieldForPlant", () => {
	const corn = {
		name: "corn",
		yield: 30,
		factor: {
			sun: {
				low: -50,
				medium: 0,
				high: 50,
			},
			rain: {
				low: -30,
				medium: 20,
				high: -50,
			},
		},
	};

	const environmentFactors = {
		sun: "low",
		rain: "high",
	};
	test("Get yield for plant with multiple environment factors", () => {
		expect(getYieldForPlant(corn, environmentFactors)).toBe(7.5);
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

describe("getYieldForCrop", () => {
	test("Get yield for crop with environment factors", () => {
		const corn = {
			name: "corn",
			yield: 18,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};
		const input = {
			crop: corn,
			numCrops: 10,
		};

		const environmentFactors = {
			sun: "low",
			rain: "low",
		};
		expect(getYieldForCrop(input, environmentFactors)).toBe(63);
	});
});

describe("getTotalYield", () => {
	test("Calculate total yield with multiple crops", () => {
		const corn = {
			name: "corn",
			yield: 45,
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 6,
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 },
		];
		expect(getTotalYield({ crops })).toBe(237);
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

describe("getTotalYield", () => {
	test("Calculate total yield with multiple crops & enviroment factors", () => {
		const corn = {
			name: "corn",
			yield: 45,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 6,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};
		const crops = [
			{ crop: corn, numCrops: 5 },
			{ crop: pumpkin, numCrops: 2 },
		];
		const environmentFactors = {
			sun: "high",
			rain: "high",
		};
		expect(getTotalYield({ crops, environmentFactors })).toBe(178);
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
		expect(getRevenueForCrop({ input })).toBe(50);
	});
});

describe("getRevenueForCrop", () => {
	test("Calculate revenue for crop with enviroment factor", () => {
		const apple = {
			name: "apple",
			yield: 5,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};

		const input = {
			crop: apple,
			numCrops: 5,
			salePrice: 2,
		};
		const environmentFactors = {
			sun: "high",
			rain: "high",
		};
		const crop = [{ crop: apple, salePrice: 2 }];
		expect(getRevenueForCrop({ input, environmentFactors })).toBe(38);
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
			salePrice: 2,
		};

		expect(getProfitForCrop({ input })).toBe(9);
	});
});

describe("getProfitForCrop", () => {
	test("Calculate profit for crop with environment", () => {
		const avocado = {
			name: "avocado",
			yield: 5,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};

		const input = {
			crop: avocado,
			numCrops: 1,
			costs: 1,
			salePrice: 2,
		};
		const environmentFactors = {
			sun: "high",
			rain: "high",
		};

		expect(getProfitForCrop({ input, environmentFactors })).toBe(9);
	});
});

describe("getTotalProfit", () => {
	test("calculate profit for muliple crops", () => {
		const corn = {
			name: "corn",
			yield: 3,
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 4,
		};

		const crops = [
			{ crop: corn, numCrops: 5, salePrice: 2, costs: 1 },
			{ crop: pumpkin, numCrops: 10, salePrice: 2, costs: 1 },
		];
		expect(getTotalProfit({ crops })).toBe(95);
	});
});

describe("getTotalProfit", () => {
	test("calculate profit for muliple crops with environment", () => {
		const corn = {
			name: "corn",
			yield: 15,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};
		const pumpkin = {
			name: "pumpkin",
			yield: 8,
			factor: {
				sun: {
					low: -50,
					medium: 0,
					high: 50,
				},
				rain: {
					low: -30,
					medium: 20,
					high: -50,
				},
			},
		};

		const crops = [
			{ crop: corn, numCrops: 5, salePrice: 2, costs: 1 },
			{ crop: pumpkin, numCrops: 10, salePrice: 2, costs: 1 },
		];

		const environmentFactors = {
			sun: "high",
			rain: "high",
		};
		expect(getTotalProfit({ crops, environmentFactors })).toBe(95);
	});
});
