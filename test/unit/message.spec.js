var expect = require('chai').expect
var message = require('../../server/message');

describe('message', function(){
  it('exists', function(){
    expect(message).to.equal('Hello World');
  });
});