# Notes

## Structure of a properly written unit test:

### AAA principles:

- arrange
- act
- assert

### Setup

### Teardown

### Tests should be independent

### Reduce code duplication

## F.I.R.S.T. Principles

Principles, not rules, that we may follow when writing tests:
- Fast
  - Unit Tests should be fast
    - Faster tests - faster feedback
- Isolated/Independent
  - Tests should be isolated from:
    - Other tests
    - External environment
      - No shared state with other tests
      - The order in which tests run should not matter
      - Contradiction with the F(fast) principle:
        - Individual tests take more time to setup
- Repeatable
  - Same result with the same input:
    - Challenge: Random/Date values - we will often mock these
  - Example: test that writes to a database:
    - It should always clean up
  - In contradiction with the Fast principle:
    - More setup and teardown operations
- Self-validating
  - After the test is finished, it's results should be clear:
    - Pass/Fail
- Thorough
  - Cover all the cases/paths/scenarios
    - Hard to think at all of them from the beginning
  - Happy cases, bad paths, edge cases
  - Invalid output
  - Large values
  - 100% code coverage - not a great indicator

---

## Jest aliases and watch mode

### test properties

- only
  - only runs the specific test (`test()` or `it()`) or test suite (`describe()`)
- skip
  - skips the given test or test suite
- todo
  - useful for making a skeleton of your testing application
- concurrent
  - experimental feature that allows tests to be run concurrently

### test aliases

- it
- test
- xit = alias for it.skip()
- fit = alias for it.only()

### watch mode

How to enable watch mode: `jest --watch`

### coverage

[Ignoring code for coverage purposes](https://github.com/gotwarlost/istanbul/blob/bc84c315271a5dd4d39bcefc5925cfb61a3d174a/ignoring-code-for-coverage.md)

---

## Test Driven Development

- TDD is great when extending an app or fixing bugs
- For big projects: first achieve a working state, then write tests

## Coding Katas

- Great ideas for small software projects that allow you to practice coding in a language you want to master better
- Great way to practice TDD

## What are test doubles?

- Pretend objects used in place of a real object for testing purposes
  - Dummy objects: passed around but not used
  - Fakes: simplified working implementation, it takes a shortcut
  - Stubs: incomplete objects used as arguments
  - Spies: tracks information about how a unit is called
  - Mocks: preprogrammed with expectations
    - The way we use mocks greatly influences the way we write tests
    - If we need to use them too much, there is something wrong with our code
    - Testing/mocking styles: London/Chicago
- Note for Jest: mocks and spies have a lot in common

### Spies vs Mocks

  - Spies are not directly injected into System Under Test (SUT)
  - Original functionality is preserved with spies
  - Spies usually track method calls

## TDD styles/schools: London and Chicago(Detroit)

### Chicago - low focus on mocks

- A unit: a collection of pieces
- Test from broader view
- Little use of mocks

### London - heavy mocks use

- A unit: a class
  - Mock all its dependencies

### Testing: a temperate approach:

- A unit is a REQUIREMENT
  - This answers the question of why some code behaves the way it behaves, it's because it's a requirement.
  - If this is required, then the tests should reflect that requirement.
  - If our units are requirements, then our tests will be very powerful.

---

## What are the advantages of a heavy mock approach?

- Test classes in isolation
- Impose a strict coding style
  - Example: too many dependencies make the class hard to test
- Once tests are in place, it is easy to create new tests

## What are the disadvantages of a heavy mock approach?

- Tests and implementation are tightly coupled
  - Small change in implementation leads to many changes in tests
- Hard to write
  - In JS/TS, we don't have a mock generator library

---

## What are the advantages of a low mock approach?

- Test more with less code
- Easier to write and to read
- Easier to maintain

## What are the disadvantages of a heavy mock approach?

- Hard to cover edge cases
- Hard to setup in some cases:
  - An ideal workflow was presented in the course
  - Instead of DB mock, we may have a docker container
  - Other services may have to be dockerized
  - CI/CD point of view: a lot more configuration is required

---

## Integration Tests

### Understanding integration tests

- Test the system as close as possible to the real deployment
- Testing stage - identical to the production stage
  - Run it locally or remotely
- How we will test our system:
  - Launch the app
  - Use it as a normal user
  - Make assertions based on the resources

--- 

## Snapshot testing

- test large objects
- test UI components, generated logic (JSON)

---

## Testing frameworks comparison

- Jest is an all-in-one library
  - test runner
  - mock
  - assert
- Mocha is a test runner
  - mock: SinonJs
  - assert: Chai
- Jest advantages
  - one library
  - easy TS integration
  - popular (better support)
  - test UI features (React)
- Mocha advantages
  - more complex features
  - `when(certainCall).thenReturn(certainResult)`
    - this can be replicated in Jest, but Mocha's solution is a bit more elegant
