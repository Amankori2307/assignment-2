function counter(counterValue?: number): [Function, Function] {
    let count = counterValue || 0;

    function getCount(): number {
        return count;
    }

    function increaseCount() {
        count++;
    }

    return [getCount, increaseCount]
}


let [getCount1, increaseCount1] = counter();
console.log("Counter 1: " + getCount1())
increaseCount1();
increaseCount1();
increaseCount1();
console.log("Counter 1: " + getCount1())

let [getCount2, increaseCount2] = counter(100);
console.log("Counter 2: " + getCount2())
increaseCount2();
increaseCount2();
increaseCount2();
console.log("Counter 2: " + getCount2())

