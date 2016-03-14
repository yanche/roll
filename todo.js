
var ToDoResult = function () {
    this.success = null;
    this.result = null;
    this.err = null;
};
ToDoResult.prototype.set = function (success, result, err) {
    this.success = success;
    this.result = result;
    this.err = err;
};

//input: generator
var ToDo = function (gen) {
    this._gen = gen;
    this.results = [];
};
ToDo.prototype.dispatch = function () {
    var ret = this._gen.next();
    if (ret.done)
        return Promise.resolve({ end: true });
    else {
        var result = new ToDoResult();
        this.results.push(result);
        return Promise.resolve({ end: false, data: ret.value, result: result });
    }
};

module.exports = ToDo;
