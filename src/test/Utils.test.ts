import { getStringInfo, StringUtils, toUpperCase } from "../app/Utils";

describe("Utils test suite", () => {
  it("should return uppercase of valid string", () => {
    // Structure of a properly written unit test - AAA principles: arrange, act, assert
    // arrange
    const sut = toUpperCase; // sut == System Under Test
    const expected = "ABC";

    // act
    const actual = sut("abc");

    // assert
    expect(actual).toBe(expected);
  });

  // you can use it.only() to only test a specific test
  // it.only('should return info for valid string', () => {
  //     const actual = getStringInfo('My-String');
  //
  //     expect(actual.lowerCase).toBe('my-string');
  //     expect(actual.extraInfo).toEqual({});
  //
  //     expect(actual.characters.length).toBe(9);
  //     expect(actual.characters).toHaveLength(9);
  //
  //     expect(actual.characters).toEqual(['M', 'y', '-', 'S', 't', 'r', 'i', 'n', 'g']);
  //     expect(actual.characters).toContain<string>('M');
  //     expect(actual.characters).toEqual(expect.arrayContaining(['S', 't', 'r', 'i', 'n', 'g']));
  //
  //     expect(actual.extraInfo).not.toBe(undefined);
  //     expect(actual.extraInfo).not.toBeUndefined();
  //     expect(actual.extraInfo).toBeDefined();
  //     expect(actual.extraInfo).toBeTruthy();
  // });

  describe("getStringInfo for arg My-String should", () => {
    test("return right length", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toHaveLength(9);
    });
    test("return lower case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.lowerCase).toBe("my-string");
    });
    test("return upper case", () => {
      const actual = getStringInfo("My-String");
      expect(actual.upperCase).toBe("MY-STRING");
    });
    test("return right characters", () => {
      const actual = getStringInfo("My-String");
      expect(actual.characters).toEqual([
        "M",
        "y",
        "-",
        "S",
        "t",
        "r",
        "i",
        "n",
        "g",
      ]);
      expect(actual.characters).toContain<string>("M");
      expect(actual.characters).toEqual(
        expect.arrayContaining(["S", "t", "r", "i", "n", "g"]),
      );
    });
    test("return defined extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toBeDefined();
    });
    test("return right extra info", () => {
      const actual = getStringInfo("My-String");
      expect(actual.extraInfo).toEqual({});
    });
  });

  describe("ToUpperCase examples", () => {
    // Parameterized Tests
    it.each([
      { input: "abc", expected: "ABC" },
      { input: "My-String", expected: "MY-STRING" },
      { input: "def", expected: "DEF" },
    ])("$input toUpperCase should be $expected", ({ input, expected }) => {
      const actual = toUpperCase(input);
      expect(actual).toBe(expected);
    });
  });

  describe("StringUtils test", () => {
    // jest hooks
    // it is good practice to put all tests and all hooks inside their relevant describe block

    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log("Setup");
    });
    afterEach(() => {
      // usually used to clear mocks
      console.log("Teardown");
    });

    it("Should return correct upperCase", () => {
      const actual = sut.toUpperCase("abc");
      console.log("Actual test");
      expect(actual).toBe("ABC");
    });
  });

  describe.only("StringUtils test", () => {
    // jest hooks
    // it is good practice to put all tests and all hooks inside their relevant describe block

    let sut: StringUtils;

    beforeEach(() => {
      sut = new StringUtils();
      console.log("Setup");
    });

    it("Should return correct upperCase", () => {
      const actual = sut.toUpperCase("abc");
      expect(actual).toBe("ABC");
    });

    it("Should throw error on invalid argument - function", () => {
      function expectError() {
        const actual = sut.toUpperCase("");
      }

      expect(expectError).toThrow();
      // expect(expectError).toThrowError('Invalid argument!'); // .toThrowError() is deprecated
      expect(expectError).toThrow("Invalid argument!");
    });

    it("Should throw error on invalid argument - arrow function", () => {
      expect(() => sut.toUpperCase("")).toThrow("Invalid argument!");
    });

    it("Should throw error on invalid argument - try catch block", (done) => {
      // this is a bad practice
      try {
        sut.toUpperCase("");
        // fail('GetStringInfo should throw error for invalid arg!');  // fail() is not defined due to a bug in jest
        // the workaround is to instead use done()
        done("GetStringInfo should throw error for invalid arg!");
      } catch (error) {
        expect(error).toBeInstanceOf(Error);
        expect(error).toHaveProperty("message", "Invalid argument!");
        done();
      }
    });
  });
});
