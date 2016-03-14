
//todo: instance of ToDo
//fn: function to process
var Roller = function (todo, fn) {
    this._todo = todo;
    this._fn = fn;
};
Roller.prototype.roll = function () {
    var self = this;
    return self._todo.dispatch()
    .then(function (todoTask) {
        //no more task
        if (todoTask.end)
            return;
        else {
            return self._fn(todoTask.data)
            .then(function (ret) {
                todoTask.result.set(true, ret);
            })
            .catch(function (err) {
                todoTask.result.set(false, null, err);
            })
            .then(function () {
                return self.roll();
            });
        }
    });
};

module.exports = Roller;
