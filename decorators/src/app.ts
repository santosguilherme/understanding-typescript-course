function Logger(logString: string) {
    return function (constructor: Function) {
        console.log(logString);
        console.log(constructor);
    };
}

function WithTemplate(template: string, hookId: string) {
    console.log("Template factory");
    return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
        return class extends originalConstructor {
            constructor(...args: any[]) {
                super(args);

                console.log('Rendering template...');
                const el = document.getElementById(hookId);

                if (el) {
                    el.innerHTML = template;
                    el.querySelector('h1')!.textContent = this.name;
                }
            }
        };
    };
}

// @Logger('LOGGING - PERSON')
@Logger('LOGGING')
@WithTemplate('<h1>My Title</h1>', 'app')
class Person {
    name = 'Guilherme';

    constructor() {
        console.log('Creating person object...');
    }
}

const pers = new Person();

console.log(pers);

function Log(target: any, propertyName: string | Symbol) {
    console.log('Property Decorator');
    console.log({target, propertyName});
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
    console.log('Accessor Decorator');
    console.log({target, name, descriptor});
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
    console.log('Method Decorator');
    console.log({target, name, descriptor});
}

function Log4(target: any, name: string | Symbol, position: number) {
    console.log('Parameter Decorator');
    console.log({target, name, position});
}

class Product {
    @Log
    title: string;
    private _price: number;

    @Log2
    set price(value: number) {
        if (value > 0) {
            this._price = value;
        } else {
            throw new Error('Invalid price - should be positive');
        }
    }

    constructor(t: string, p: number) {
        this.title = t;
        this._price = p;
    }

    @Log3
    getPriceWithTax(@Log4 tax: number) {
        return this._price * (1 + tax);
    }
}

const p1 = new Product('p1', 1);
const p2 = new Product('p2', 2);

function AutoBind(_target: any, _methodName: string, descriptor: PropertyDescriptor): PropertyDescriptor {
    const originalMethod = descriptor.value;
    const newDescriptor: PropertyDescriptor = {
        configurable: true,
        enumerable: false,
        get() {
            const boundFn = originalMethod.bind(this);
            return boundFn;
        }
    };

    return newDescriptor;
}

class Printer {
    message = 'This works!';

    @AutoBind
    showMessage() {
        console.log(this.message);
    }
}

const printer = new Printer();
const button = document.querySelector('button')!;
button.addEventListener('click', printer.showMessage);


interface ValidatorConfig {
    [property: string]: {
        [validatableProperty: string]: string[]; // ['required', 'positive']
    };
}

const registeredValidators: ValidatorConfig = {};

function Required(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'required']
    };
}

function PositiveNumber(target: any, propName: string) {
    registeredValidators[target.constructor.name] = {
        ...registeredValidators[target.constructor.name],
        [propName]: [...(registeredValidators[target.constructor.name]?.[propName] ?? []), 'positive']
    };
}

function validate(obj: any) {
    const objValidatorConfig = registeredValidators[obj.constructor.name];

    if (!objValidatorConfig) {
        return true;
    }

    let isValid = true;
    for (const prop in objValidatorConfig) {
        for (const validator of objValidatorConfig[prop]) {
            switch (validator) {
                case 'required': {
                    isValid = isValid && !!obj[prop];
                    break;
                }
                case 'positive': {
                    isValid = isValid && obj[prop] > 0;
                    break;
                }
            }
        }
    }

    return isValid;
}

class Course {
    @Required
    title: string;
    @PositiveNumber
    price: number;

    constructor(t: string, p: number) {
        this.title = t;
        this.price = p;
    }
}

const courseForm = document.querySelector('form')!;
courseForm.addEventListener('submit', event => {
    event.preventDefault();

    const titleEl = document.getElementById('title') as HTMLInputElement;
    const priceEl = document.getElementById('price') as HTMLInputElement;

    const title = titleEl.value;
    const price = +priceEl.value;

    const course = new Course(title, price);

    if (!validate(course)) {
        alert('Invalid values, try again!');
        return;
    }

    console.log(course);
});
