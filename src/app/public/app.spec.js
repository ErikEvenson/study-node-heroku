require('./app');

describe('App module', function() {
  beforeEach(angular.mock.module('app'));

  it('stub test 1', function() {
    expect(1).toEqual(1);
  });
});
