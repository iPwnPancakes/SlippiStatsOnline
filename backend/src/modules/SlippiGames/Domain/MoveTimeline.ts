import { Move } from "./Move";
import { Input } from "./Input";
import { Result } from "../../../shared/Core/Result";

export interface MoveTimelineProps {
    moves: Move[];
}

export class MoveTimeline {
    public readonly props: MoveTimelineProps;

    public static create(props: MoveTimelineProps): Result<MoveTimeline> {
        return Result.ok(new MoveTimeline(props));
    }

    private constructor(props: MoveTimelineProps) {
        props.moves = props.moves.sort((a, b) => {
            if (a.getTimestamp() > b.getTimestamp()) {
                return 1;
            } else if (a.getTimestamp() < b.getTimestamp()) {
                return -1;
            }

            return 0;
        });

        this.props = props;
    }

    public getMoveAtIndex(i: number) {
        return this.props.moves[i];
    }

    public getMoveAtTime(timestamp: Date) {
        return this.props.moves.find(move => move.getTimestamp() === timestamp);
    }

    public getMovesWithInput(input: Input) {
        return this.props.moves.filter(move => move.getInput().equals(input));
    }
}
