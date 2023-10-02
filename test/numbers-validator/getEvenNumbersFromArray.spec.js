const { describe, it } = require('mocha');
const { expect } = require('chai');
const NumbersValidator = require('../../app/code');

describe('getEvenNumbersFromArray positive test', () => {
  let validator;
  before(() => {
    validator = new NumbersValidator();
  });
  after(() => {
    validator = null;
  });

  it('should filter even numbers from an array of numbers', () => {
    const validationResult = validator.getEvenNumbersFromArray([
      28, 1, 2, 3, 4, 5, 6,
    ]);
    expect(validationResult).to.deep.equal([28, 2, 4, 6]);
  });
});

describe('getEvenNumbersFromArray negative tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });

  it('should throw an error when the parameter is not an array', () => {
    const nonArrayParameters = [null, 'string', 4, undefined, true, {}];

    nonArrayParameters.forEach((parameter) => {
      const validationResult = () => validator.getEvenNumbersFromArray(parameter);
      expect(validationResult).to.throw(Error, /is not an array of "Numbers"/);
    });
  });

  it('should throw an error when the provided array contains elements that are not numbers by data type', () => {
    const validationResult = () => validator.getEvenNumbersFromArray([1, '2', 3, 4, 5, 6]);
    expect(validationResult).to.throw(Error, /is not an array of "Numbers"/);
  });
});
