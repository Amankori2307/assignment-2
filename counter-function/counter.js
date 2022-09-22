"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.counter = void 0;
function counter(counterValue) {
    let count = counterValue || 0;
    function getCount() {
        return count;
    }
    function increaseCount() {
        count++;
    }
    return [getCount, increaseCount];
}
exports.counter = counter;
let [getCount1, increaseCount1] = counter();
console.log("Counter 1: " + getCount1());
increaseCount1();
increaseCount1();
increaseCount1();
console.log("Counter 1: " + getCount1());
let [getCount2, increaseCount2] = counter(100);
console.log("Counter 2: " + getCount2());
increaseCount2();
increaseCount2();
increaseCount2();
console.log("Counter 2: " + getCount2());
