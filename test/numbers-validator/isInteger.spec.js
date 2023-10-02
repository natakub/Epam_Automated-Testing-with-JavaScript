const { describe, it } = require('mocha');
const { expect } = require('chai');
const NumbersValidator = require('../../app/code');

describe('isInteger positive tests', () => {
  let validator;
  before(() => {
    validator = new NumbersValidator();
  });
  after(() => {
    validator = null;
  });

  it('should return true when provided with a number', () => {
    const validationResult = validator.isInteger(4);
    expect(validationResult).to.be.equal(true);
  });
});

describe('isInteger negative test', () => {
  let validator;
  before(() => {
    validator = new NumbersValidator();
  });
  after(() => {
    validator = null;
  });

  it('should throw an error when the parameter is not a number', () => {
    const nonArrayParameters = [null, 'string', undefined, true, {}, []];

    nonArrayParameters.forEach((parameter) => {
      const validationResult = () => validator.isInteger(parameter);
      expect(validationResult).to.throw(Error, /is not a number/);
    });
  });
});
