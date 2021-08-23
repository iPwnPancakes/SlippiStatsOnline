import {Input} from "./Input";

export class Move {
    constructor(private timestamp: Date, private buttonInput: Input) {
    }

    public getTimestamp(): Date {
        return this.timestamp;
    }

    public getInput(): Input {
        return this.buttonInput;
    }
}
