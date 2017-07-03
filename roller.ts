
import { ToDo } from "./todo";

export default class Roller<Ti, To>{
    private _todo: ToDo<Ti, To>;
    private _fn: (data: Ti) => Promise<To>;

    constructor(todo: ToDo<Ti, To>, fn: (data: Ti) => Promise<To>) {
        this._todo = todo;
        this._fn = fn;
    }

    public roll(): Promise<void> {
        return this._todo.dispatch()
            .then(task => {
                if (!task.end) {
                    return this._fn(task.data)
                        .then(data => {
                            task.result.set(true, data);
                        }, (err: Error) => {
                            task.result.set(false, null, err);
                        })
                        .then(() => this.roll())
                }
            });
    }
}
