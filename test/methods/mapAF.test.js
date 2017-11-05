const { expect } = require('chai');

describe('the true meaning of life', () => {
  context('just setting up testing environment', () => {
    it('should be true', () => expect(true).to.be.true);
    it('should be false', () => expect(false).to.be.true);
  });
});
