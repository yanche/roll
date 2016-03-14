
var ToDo = require('./todo.js');
var Roller = require('./roller.js');

var arr2Gen = function* (arr) {
    yield* arr;
};

//gen: array or generator
var roll = function (gen, fn, rlimit) {
    rlimit = Number(rlimit);
    if (isNaN(rlimit) || rlimit <= 0 || Math.ceil(rlimit) != rlimit)
        return Promise.reject(new Error('rlimit must be positive integer'));
    //TODO: for any iterable
    if (Array.isArray(gen))
        gen = arr2Gen(gen);
    var rolls = new Array(rlimit), todo = new ToDo(gen);
    for (var i = 0; i < rlimit; ++i) {
        rolls[i] = new Roller(todo, fn);
    }
    return Promise.all(rolls.map(function (r) { return r.roll(); }))
    .then(function () {
        //all complete
        return todo.results.map(function (r) { return r.result; });
    });
};

module.exports = roll;
