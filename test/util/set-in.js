import expect from "expect";
import setIn from "../../src/util/set-in";

describe("setIn", () => { //eslint-disable-line no-undef

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

	it("should set a value in the given object", () => { //eslint-disable-line no-undef

		let obj = {a: "b", c: ["d", "e"]};
		let obj1 = setIn(["c", 1], "f", obj);

		expect(obj1).toEqual({a: "b", c: ["d", "f"]});
	});

	it("should alway return a clone of the given object", () => { //eslint-disable-line no-undef

		let obj = {a: "b", c: ["d", "e"]};
		let obj1 = setIn(["c", 1], "f", obj);

		expect(obj1 === obj).toEqual(false);
	});

	it("should not alter the original path", () => { //eslint-disable-line no-undef
		let path = ["c", 1];
		let obj = {a: "b", c: ["d", "e"]};
		setIn(path, "f", obj);

		expect(path).toEqual(["c", 1]);
	});

	it("should be timed", () => { //eslint-disable-line no-undef
		const before = new Date().getTime();
		for(let i = 0; i < 500; i++) {
			setIn(bigPath, i, bigObj);
		}
		expect(new Date().getTime() - before < 500).toBe(true);
	});

});