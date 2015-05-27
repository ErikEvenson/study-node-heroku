var expect = require('chai').expect
var message = require('../../server/message');

describe('message', function(){
  it('should be equal to "Hello World"', function(){
    expect(message).to.equal('Hello World');
  });
});