const { describe, it } = require('mocha');
const { expect } = require('chai');
const NumbersValidator = require('../../app/code');

describe('isAllNumbers positive test', () => {
  let validator;
  before(() => {
    validator = new NumbersValidator();
  });
  after(() => {
    validator = null;
  });

  it('should return true when all elements in the provided array are numbers', () => {
    const validationResult = validator.isAllNumbers([1, 2, 3, 4, 5, 6, 28]);
    expect(validationResult).to.be.equal(true);
  });

  it('should return false when at least one element in the provided array is not a number', () => {
    const validationResult = validator.isAllNumbers([1, '2', 3, 4, 5, 6, 28]);
    expect(validationResult).to.be.equal(false);
  });
});

describe('isAllNumbers negative test', () => {
  let validator;
  before(() => {
    validator = new NumbersValidator();
  });
  after(() => {
    validator = null;
  });

  it('should throw an error when the parameter is not an array', () => {
    const nonArrayParameters = [null, 'string', 4, undefined, true, {}];

    nonArrayParameters.forEach((parameter) => {
      const validationResult = () => validator.isAllNumbers(parameter);
      expect(validationResult).to.throw(Error, /is not an array/);
    });
  });
});
