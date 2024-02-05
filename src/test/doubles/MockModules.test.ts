// all functions in this module are empty, just mocks
jest.mock("../../app/doubles/OtherUtils", () => ({
  // this is how to only mock some functions within a module
  ...jest.requireActual("../../app/doubles/OtherUtils"),
  calculateComplexity: () => 10,
}));
jest.mock("uuid", () => ({
  v4: () => "123",
}));

import * as OtherUtils from "../../app/doubles/OtherUtils";

describe("module tests", () => {
  test("calculate complexity", () => {
    const actual = OtherUtils.calculateComplexity({} as any);
    expect(actual).toBe(10);
  });

  test("keep other functions", () => {
    const actual = OtherUtils.toUpperCase("abc");
    expect(actual).toBe("ABC");
  });

  test("string with id", () => {
    const actual = OtherUtils.toLowerCaseWithId("ABC");
    expect(actual).toBe("abc123");
  });
});
