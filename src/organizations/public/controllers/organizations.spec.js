describe('Testing Organizations Controller', function() {
  var _scope, OrganizationsController;

  beforeEach(function() {
    module('organizations');

    jasmine.addMatchers({
      toEqualData: function(util, customEqualityTesters) {
        return {
          compare: function(actual, expected) {
            return {
              pass: angular.equals(actual, expected)
            };
          }
        };
      }
    });
    inject(function($rootScope, $controller) {
      _scope = $rootScope.$new();
      OrganizationsController = $controller('OrganizationsController', {
        $scope: _scope
      });
    });
  });

  it(
    'Should have a find method that uses $resource to retrieve a list of organizations',
    inject(function(Organizations) {
      inject(function($httpBackend) {
        var sampleOrganization = new Organizations({
          name: 'organization',
          email: 'org@example.com'
        });
        var sampleOrganizations = [sampleOrganization];

        $httpBackend.expectGET('api/organizations').respond(sampleOrganizations);

        _scope.find();
        $httpBackend.flush();

        expect(_scope.organizations).toEqualData(sampleOrganizations);
      });
    })
  );

  it(
    'Should have a findOne method that uses $resource to retreive a single of organization',
    inject(function(Organizations) {
      inject(function($httpBackend, $routeParams) {
        var sampleOrganization = new Organizations({
          name: 'organization',
          email: 'org@example.com'
        });

        $routeParams.organizationId = 'abcdef123456789012345678';

        $httpBackend.expectGET(/api\/organizations\/([0-9a-fA-F]{24})$/).respond(sampleOrganization);

        _scope.findOne();
        $httpBackend.flush();

        expect(_scope.organization).toEqualData(sampleOrganization);
      });
   })
  );
});
