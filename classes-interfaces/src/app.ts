// type AddFn = (a: number, b: number) => number;
interface AddFn {
    (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => n1 + n2;

interface Named {
    readonly name?: string;
    outputName?: string;
}

// interfaces are only available during development and compilation phases
interface Greetable extends Named {
    greet(phrase: string): void;
}

class Person implements Greetable {
    name?: string;
    age = 30;

    constructor(n?: string) {
        if (n) {
            this.name = n;
        }
    }

    greet(phrase: string) {
        if (this.name) {
            console.log(phrase, this.name);
        } else {
            console.log('Hi!');
        }
    }

}

let user1: Greetable;

user1 = new Person('Guilherme');
user1.greet('Hi there - I am');
