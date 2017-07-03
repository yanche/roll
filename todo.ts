
export class ToDoResult<T> {
    success: boolean;
    result: T;
    err: Error;

    set(success: boolean, result: T, err?: Error) {
        this.success = success;
        this.result = result;
        this.err = err;
    }
}

export class ToDo<Ti, To> {
    private _gen: IterableIterator<Ti>;
    private _results: Array<ToDoResult<To>>;

    get results() { return this._results; }
    constructor(gen: IterableIterator<Ti>) {
        this._results = new Array<ToDoResult<To>>();
        this._gen = gen;
    }
    dispatch(): Promise<{ end: boolean, data?: Ti, result?: ToDoResult<To> }> {
        const ret = this._gen.next();
        if (ret.done) return Promise.resolve({ end: true });
        else {
            const result = new ToDoResult<To>();
            this._results.push(result);
            return Promise.resolve({ end: false, data: ret.value, result: result });
        }
    }
}
