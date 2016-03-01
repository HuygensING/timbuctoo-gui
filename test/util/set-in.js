import expect from "expect";
import setIn from "../../src/util/set-in";

describe("setIn", () => { //eslint-disable-line no-undef

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

});