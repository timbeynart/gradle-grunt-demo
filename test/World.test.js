
module('Test Hello', {
  setup: function () {
    this.classToTest = new World();
  },
  teardown: function () {
  }
});

QUnit.test('peace function returns correct sum.', function (assert) {
    var sum = this.classToTest.peace(1.6,2.1);
    assert.equal(sum, 3);
});
