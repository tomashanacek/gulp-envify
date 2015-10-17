var assert = require('assert');
var es = require('event-stream');
var File = require('vinyl');
var envify = require('../');

describe('gulp-envify', function() {
    it('replaces environment variables', function(done) {

      // create the fake file
      var fakeFile = new File({
        contents: new Buffer(
          'if (process.env.NODE_ENV === "development") {' +
          '  console.log("development only");' +
          '}'
        )
      });

      var myEnvify = envify({NODE_ENV: 'production'});

      // write the fake file to it
      myEnvify.write(fakeFile);

      // wait for the file to come back out
      myEnvify.once('data', function(file) {
        // make sure it came out the same way it went in
        assert(file.isBuffer());

        // check the contents
        assert.equal(
          file.contents.toString('utf8'),
          'if ("production" === "development") {' +
          '  console.log("development only");' +
          '}'
        );
        done();
      });

    });
});
