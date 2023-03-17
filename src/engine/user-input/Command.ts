export class Command {
    execute: () => void;
    undo?: () => void;

    constructor(execute: () => void, undo?: () => void) {
        this.execute = execute;
    }
}
