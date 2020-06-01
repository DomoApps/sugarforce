function AutoComplete(callback) {
  try {
    if (!callback) {
      throw 'Error: "callback" is a required parameter';
    }
    this.constructor(callback);
  } catch (e) {
    console.error(e);
  }
}

AutoComplete.prototype = {
  callback: undefined,

  constructor(callback) {
    this.callback = callback;
  }
}