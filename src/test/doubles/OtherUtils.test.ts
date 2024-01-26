import {
    calculateComplexity,
    OtherStringUtils,
    toUpperCaseWithCb
} from "../../app/doubles/OtherUtils";

describe('OtherUtils test suite', () => {
    it('Calculates complexity', () => {
        // stubs
        const someInfo = {
            length: 5,
            extraInfo: {
                field1: 'someInfo',
                field2: 'someOtherInfo',
            }
        }

        const actual = calculateComplexity(someInfo as any);
        expect(actual).toBe(10);
    });

    it('ToUpperCase - calls callback for invalid argument', () => {
        // fakes - simplified implementations of external services
        const actual = toUpperCaseWithCb('', () => {});
        expect(actual).toBeUndefined();
    });

    it('ToUpperCase - calls callback for valid argument', () => {
        // fakes - simplified implementations of external services
        const actual = toUpperCaseWithCb('abcd', () => {});
        expect(actual).toBe('ABCD');
    });

    describe('Tracking callbacks', () => {
        // mocks
        let cbArgs = [];
        let timesCalled = 0;

        function callBackMock(arg: string) {
            cbArgs.push(arg);
            timesCalled++;
        }

        afterEach(() => {
            // clearing tracking fields
            cbArgs = [];
            timesCalled = 0;
        })

        it('calls callback for invalid argument - track calls', () => {
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined();
            expect(cbArgs).toContain('Invalid argument!');
            expect(timesCalled).toBe(1);
        });

        it('calls callback for valid argument - track calls', () => {
            const actual = toUpperCaseWithCb('abc', callBackMock);
            expect(actual).toBe('ABC');
            expect(cbArgs).toContain('called function with abc');
            expect(timesCalled).toBe(1);
        });
    });

    describe('Tracking callbacks with Jest mocks', () => {
        // mocks
        const callBackMock = jest.fn();

        afterEach(() => {
            // clearing tracking fields
            jest.clearAllMocks();
        });

        it('calls callback for invalid argument - track calls', () => {
            const actual = toUpperCaseWithCb('', callBackMock);
            expect(actual).toBeUndefined();
            // expect(callBackMock).toBeCalledWith('Invalid argument!');  // deprecated
            // expect(callBackMock).toBeCalledTimes(1);  // deprecated
            expect(callBackMock).toHaveBeenCalledWith('Invalid argument!');
            expect(callBackMock).toHaveBeenCalledTimes(1);

        });

        it('calls callback for valid argument - track calls', () => {
            const actual = toUpperCaseWithCb('abc', callBackMock);
            expect(actual).toBe('ABC');
            expect(callBackMock).toHaveBeenCalledWith('called function with abc');
            expect(callBackMock).toHaveBeenCalledTimes(1);
        });
    });

    describe('OtherStringUtils tests with spies', () => {
        // spies
        let sut: OtherStringUtils;

        beforeEach(() => {
            sut = new OtherStringUtils();
        });

        test('Use a spy to track calls', () => {
            const toUpperCaseSpy = jest.spyOn(sut, "toUpperCase");
            sut.toUpperCase('asa');
            expect(toUpperCaseSpy).toHaveBeenCalledWith('asa');
        });

        test('Use a spy to track calls to other module', () => {
            const consoleLogSpy = jest.spyOn(console, "log");
            sut.logString('abc');
            expect(consoleLogSpy).toHaveBeenCalledWith('abc');
        });

        test('Use a spy to replace the implementation of a method - bad practice', () => {
            // this is a bad practice
            // cannot spy on private methods, results in a compilation error
            // We usually don't want to call private methods inside our tests (this would indicate a big problem with our implementation), this is a hack for emergency situations
            jest.spyOn(sut as any, 'callExternalService').mockImplementation(() => {
                console.log('calling mocked implementation!!!')
            });
            (sut as any).callExternalService();
        });

        test('Use a spy to replace the implementation of a method', () => {
            jest.spyOn(sut, 'callExternalService').mockImplementation(() => {
                console.log('calling mocked implementation!!!')
            });
            sut.callExternalService();
        });
    });
});
