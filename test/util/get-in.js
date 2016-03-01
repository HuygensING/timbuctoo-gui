import expect from "expect";
import getIn from "../../src/util/get-in";

describe("setIn", () => { //eslint-disable-line no-undef

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

});