describe('Organizations E2E Tests:', function() {
  describe('New Organization Page', function() {
    beforeEach(function() {
      isAngularSite(true);
    });

    it('Should not be able to create a new organization', function() {
      browser.get('/#!/organizations/create');
      element(by.css('input[type=submit]')).click();

      element(by.binding('error')).getText().then(function(errorText) {
        expect(errorText).toBe('User is not logged in');
      });
    });
  });
});
