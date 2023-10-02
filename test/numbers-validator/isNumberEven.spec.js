const { describe, it } = require('mocha');
const { expect } = require('chai');
const NumbersValidator = require('../../app/code');

describe('isNumberEven positive tests', () => {
  let validator;
  beforeEach(() => {
    validator = new NumbersValidator();
  });
  afterEach(() => {
    validator = null;
  });

  it('should return true when provided with an even number', () => {
    const validationResult = validator.isNumberEven(4);
    expect(validationResult).to.be.equal(true);
  });

  it('should return false when provided with an odd number', () => {
    const validationResult = validator.isNumberEven(5);
    expect(validationResult).to.be.equal(false);
  });
});

describe('isNumberEven negative test', () => {
  let validator;
  before(() => {
    validator = new NumbersValidator();
  });
  after(() => {
    validator = null;
  });

  it('should throw an error when the parameter is not a number', () => {
    const nonNumericParameters = [null, 'string', undefined, true, {}, []];

    nonNumericParameters.forEach((parameter) => {
      const validationResult = () => validator.isNumberEven(parameter);
      expect(validationResult).to.throw(Error, /is not of type "Number"/);
    });
  });
});
