import * as F from '../../src/Functions';
import { expect } from 'chai';

describe("Unit Tests - Functions", function() {
  it("Adding 1 to 1 yields 2", function() {
    expect(F.addOne(1)).to.equal(2);
  });

  it("Adding 2 to 1 yields 3", function() {
    expect(F.addTwo(1)).to.equal(3);
  });

  it("Adding 2 to result of Adding 1 to 1 yields 4", function() {
    let one = 1;
    var result;

    result = F.addOne(one);
    result = F.addTwo(result);

    expect(result).to.equal(4);
  });
});
