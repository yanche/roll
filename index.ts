
import { ToDo } from "./todo";
import Roller from "./roller";

function* arr2Gen<T>(arr: Array<T>): IterableIterator<T> {
    yield* arr;
}

export default function roll<Ti, To>(gen: Array<Ti> | IterableIterator<Ti>, fn: (t: Ti) => Promise<To>, rlimit: number): Promise<Array<To>> {
    if (rlimit <= 0 || Math.ceil(rlimit) !== rlimit) return Promise.reject(new Error("rlimit must be a positive integer"));
    let gen2: IterableIterator<Ti> = null;
    if (Array.isArray(gen)) gen2 = arr2Gen(gen);
    else gen2 = gen;
    const rolls = new Array<Roller<Ti, To>>(rlimit), todo = new ToDo<Ti, To>(gen2);
    for (let i = 0; i < rlimit; ++i) {
        rolls[i] = new Roller(todo, fn);
    }
    return Promise.all(rolls.map(r => r.roll()))
        .then(() => todo.results.map(r => r.result));
}
