
module('Test Hello', {
  setup: function () {
    this.classToTest = new Hello();
  },
  teardown: function () {
  }
});


QUnit.test('world function returns correct string.', function (assert) {
    var str = this.classToTest.world('Tim');
    assert.equal(str, 'Hello Tim!');
});
