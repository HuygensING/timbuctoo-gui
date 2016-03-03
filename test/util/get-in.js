import expect from "expect";
import getIn from "../../src/util/get-in";

describe("getIn", () => { //eslint-disable-line no-undef

	const bigObj = {};
	const bigPath = [];
	before(() => { //eslint-disable-line no-undef
		let current = bigObj;
		for(let i = 0; i < 1000; i++) {
			current.a = {};
			current = current.a;
			if(i < 999) {
				bigPath.push("a");
			}
		}
	});

	it("should get a value in the given object", () => { //eslint-disable-line no-undef

		let obj = {a: "b", c: ["d", "e"]};
		let val = getIn(["c", 1], obj);

		expect(val).toEqual("e");
	});

	it("should not alter the original path", () => { //eslint-disable-line no-undef
		let path = ["c", 1];
		let obj = {a: "b", c: ["d", "e"]};
		getIn(path, obj);

		expect(path).toEqual(["c", 1]);
	});

	it("should be timed", () => { //eslint-disable-line no-undef
		const before = new Date().getTime();
		for(let i = 0; i < 500; i++) {
			getIn(bigPath, bigObj);
		}
		expect(new Date().getTime() - before < 250).toBe(true);
	});
});