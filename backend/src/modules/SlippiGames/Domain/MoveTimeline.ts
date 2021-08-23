import {Move} from "./Move";
import {Input} from "./Input";

export class MoveTimeline {
    private readonly moves: Move[];

    constructor(moves: Move[]) {
        // TODO: Sort moves by timestamp
        this.moves = moves.sort((a, b) => {
            if (a.getTimestamp() > b.getTimestamp()) {
                return 1;
            } else if (a.getTimestamp() < b.getTimestamp()) {
                return -1;
            }

            return 0;
        });
    }

    public getMoveAtIndex(i: number) {
        return this.moves[i];
    }

    public getMoveAtTime(timestamp: Date) {
        return this.moves.find(move => move.getTimestamp() === timestamp);
    }

    public getMovesWithInput(input: Input) {
        return this.moves.filter(move => move.getInput().equals(input));
    }
}
