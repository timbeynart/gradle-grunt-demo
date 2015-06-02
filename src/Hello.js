/**
 * This object introduces our application with the utmost tact.
 * @constructor
 */
function Hello() {
  /**
   * This method takes a string argument and returns a phrase in the form 'Hello [arg]!'
   * @param value {string}
   * @returns {string} 'Hello [value]!'
   */
  this.world = function (value) {
    return 'Hello ' + value + '!';
  };
}
