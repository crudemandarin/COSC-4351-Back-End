import Utils from "../src/utils";

describe("Utilities Function Testing", () => {
	test("Basic Test", () => {
		const guestList = [1, 1];
		const tableList = [1, 2, 3];
		expect(Utils.isTableAvailable(guestList, tableList)).toBe(true);
	});

	test("Advanced Test", () => {
		const guestList = [2, 2, 3, 4, 4, 5, 6, 7, 3, 5, 6, 7];
		const tableList = [1, 2, 2, 2, 4, 4, 4, 5, 6, 6, 8];
		expect(Utils.isTableAvailable(guestList, tableList)).toBe(false);
	});

	test("Basic Combinatory", () => {
		const guestList = [1, 5];
		const tableList = [1, 2, 3];
		expect(Utils.isTableAvailable(guestList, tableList)).toBe(true);
	});

	test("Advanced Combinatory", () => {
		const guestList = [2, 2, 3, 4, 4, 5, 6];
		const tableList = [1, 2, 2, 2, 4, 4, 4, 5, 6, 6, 8];
		expect(Utils.isTableAvailable(guestList, tableList)).toBe(true);
	});
});
