abstract class Department {
    static fiscalYear = 2022;
    protected employees: string[] = [];

    constructor(protected readonly id: string, public name: string) {
    }

    static createEmployee(name: string) {
        return {name};
    }

    abstract describe(this: Department): void;

    addEmployee(employee: string) {
        this.employees.push(employee);
    }

    printEmployeeInformation() {
        console.log('Employees:', this.employees.length, '-', this.employees);
    }
}

class ITDepartment extends Department {
    constructor(id: string, public admins: string[]) {
        super(id, 'IT');
        // use this after calling super
    }

    describe() {
        console.log('IT Department - ID', this.id);
    }
}

class AccountingDepartment extends Department {
    private lastReport: string;
    private static instance: AccountingDepartment;

    get mostRecentReport() {
        if (this.lastReport) {
            return this.lastReport;
        }

        throw new Error('No report found');
    }

    set mostRecentReport(value: string) {
        if (!value) {
            throw new Error('Please, insert a valid value!');
        }
        this.addReport(value);
    }

    private constructor(id: string, private reports: string[]) {
        super(id, 'Accounting');
        this.lastReport = reports[0];
    }

    static getInstance() {
        if (AccountingDepartment.instance) {
            return this.instance;
        }

        this.instance = new AccountingDepartment('2', []);
        return this.instance;
    }

    describe() {
        console.log('Account Department - ID', this.id);
    }

    addEmployee(employeeName: string) {
        if (employeeName === 'Max') {
            return;
        }
        this.employees.push(employeeName);
    }

    addReport(text: string) {
        this.reports.push(text);
        this.lastReport = text;
    }

    printReports() {
        console.log(this.reports);
    }
}

console.log(Department.fiscalYear);

const employee1 = Department.createEmployee('Guilherme');
console.log(employee1);

const it = new ITDepartment('1', ['Max']);
it.describe();
it.addEmployee('Guilherme');
it.addEmployee('Max');
it.printEmployeeInformation();

const accounting = AccountingDepartment.getInstance();
accounting.describe();
accounting.mostRecentReport = 'Year End report';
accounting.addEmployee('Leticia');
accounting.addEmployee('Max');
accounting.addReport('something went wrong...');
console.log(accounting.mostRecentReport);
accounting.printReports();
accounting.printEmployeeInformation();
