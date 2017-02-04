var assert = require('assert');
var registJS = require('../script/index.js');
describe('Base function test', function() {
  describe('register js', function() {
    it('should not undefined', function() {
      assert.notEqual(undefined, registJS.add);
      assert.notEqual(undefined, registJS.get);
    });
  });
});
