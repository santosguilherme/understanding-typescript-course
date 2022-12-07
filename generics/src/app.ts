const names: Array<string> = ['Guilherme']; //string[]
// names[0.split(' ');

const promise: Promise<string> = new Promise((resolve, _reject) => {
    setTimeout(() => {
        resolve('done!');
    }, 2000);
});

promise.then(data => {
    data.split(' ');
});

function merge<T extends object, U extends object>(first: T, second: U) {
    return Object.assign(first, second);
}

const merged = merge({name: 'Guilherme', hobbies: ['Gaming']}, {age: 30});
console.log(merged);


interface Lengthy {
    length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
    let description = 'No value.';

    if (element.length === 1) {
        description = 'Got 1 element';
    } else if (element.length > 1) {
        description = `Got ${element.length} elements`;
    }

    return [element, description];
}

console.log(countAndDescribe(['Guilherme', 'Max']));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
    return 'Value: ' + obj[key];
}

console.log(extractAndConvert({name: 'Guilherme'}, 'name'));


class DataStorage<T extends number | string | boolean> {
    private data: T[] = [];

    addItem(item: T) {
        this.data.push(item);
    }

    removeItem(item: T) {
        if (this.data.indexOf(item) === -1) {
            return;
        }
        this.data.splice(this.data.indexOf(item), 1);
    }

    getItems() {
        return [...this.data];
    }
}

const textStorage = new DataStorage<string>();
textStorage.addItem('Guilherme');
console.log(textStorage.getItems());

const numberStorage = new DataStorage<number>();
numberStorage.addItem(1);
console.log(numberStorage.getItems());

// FAIL
// const objStorage = new DataStorage<object>();
// objStorage.addItem({name: 'Max'});
// objStorage.addItem({name: 'Guilherme'});
//
// objStorage.removeItem({name: 'Max'});
//
// console.log(objStorage.getItems());

interface CourseGoal {
    title: string;
    description: string;
    completeUntil: Date;
}

function createCourseGoal(title: string, description: string, date: Date): CourseGoal {
    const goal: Partial<CourseGoal> = {};

    goal.title = title;
    goal.description = description;
    goal.completeUntil = date;

    return goal as CourseGoal;
}

const readonlyNames: Readonly<string[]> = ['Guilherme', 'Max'];
// readonlyNames.push('Manu');
// readonlyNames.pop();
