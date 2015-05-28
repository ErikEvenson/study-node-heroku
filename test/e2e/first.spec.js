// at the top of the test spec:
var fs = require('fs');

// abstract writing screen shot to a file
function writeScreenShot(data, filename) {
  var stream = fs.createWriteStream(filename);

  stream.write(new Buffer(data, 'base64'));
  stream.end();
}

describe('first', function () {
  beforeEach(function() {
      isAngularSite(false);
  });

  it('runs dummy test', function () {
    browser.ignoreSynchronization = true;
    browser.get('/');

    browser.takeScreenshot().then(function (png) {
      writeScreenShot(png, __dirname + '/output/first.png');
    });

    var el = element(by.id('hello'));
    expect(el.getText()).toEqual('Hello World');
  })
})
