type Admin = {
    name: string;
    privileges: string[];
}

type Employee = {
    name: string;
    startDate: Date;
}

// interface ElevatedEmployee extends Employee, Admin;
type ElevatedEmployee = Admin & Employee;

const e1: ElevatedEmployee = {
    name: 'Guilherme',
    privileges: ['create-server'],
    startDate: new Date()
};

type UnknownEmployee = Employee | Admin;

function printEmployeeInformation(emp: UnknownEmployee) {
    console.log('Name:', emp.name);

    if ('privileges' in emp) {
        console.log('Privileges:', emp.privileges);
    }

    if ('startDate' in emp) {
        console.log('Start Date:', emp.startDate);
    }
}

printEmployeeInformation(e1);
printEmployeeInformation({name: 'Max', startDate: new Date()});

class Car {
    drive() {
        console.log("Driving a car...");
    }
}

class Truck {
    drive() {
        console.log("Driving a truck...");
    }

    loadCargo(amount: number) {
        console.log("Loading cargo of", amount);
    }
}

type Vehicle = Car | Truck;

function useVehicle(vehicle: Vehicle) {
    vehicle.drive();

    if (vehicle instanceof Truck) {
        vehicle.loadCargo(1000);
    }
}

useVehicle(new Car());
useVehicle(new Truck());

type Combinable = string | number;
type Numeric = number | boolean;

type Universal = Combinable & Numeric;

function add(a: number, b: number): number;
function add(a: string, b: string): string;
function add(a: Combinable, b: Combinable) {
    if (typeof a === 'string' || typeof b === 'string') {
        return a.toString() + b.toString();
    }

    return a + b;
}


// Function Overload

const result = add('Guilherme', 'Santos');
result.split(' ');

// Discriminated Unions
interface Bird {
    type: 'bird';
    flyingSpeed: number;
}

interface Horse {
    type: 'horse';
    runningSpeed: number;
}

type Animal = Bird | Horse

function moveAnimal(animal: Animal) {
    let speed;
    switch (animal.type) {
        case "bird": {
            speed = animal.flyingSpeed;
            break;
        }

        case "horse": {
            speed = animal.runningSpeed;
            break;
        }
    }

    console.log('Moving at speed:', speed);
}

moveAnimal({type: 'bird', flyingSpeed: 10});

// Type Casting

// const userInput = <HTMLInputElement>document.getElementById('user-input')!;
const userInput = document.getElementById('user-input');

if (userInput) {
    (userInput as HTMLInputElement).value = 'Hi there';
}


// Index Properties
interface ErrorContainer {
    [key: string]: string;
}

// eg: { email: "Invalid email", name: "Must start with a capital character" }

const errorBag: ErrorContainer = {
    email: 'Not a valid email!',
    username: "Must start with a capital character!",
    any: "Any error message!"
};


// Optional Chaining

const fetchedUserData = {
    id: '1',
    name: 'Guilherme',
    job: {title: 'Frontend Engineer', description: 'React'}
};

console.log(fetchedUserData?.job?.title);


// Nullish Coalescing
const userInputValue = '';
const storedData = userInputValue ?? 'DEFAULT';
console.log(storedData);
