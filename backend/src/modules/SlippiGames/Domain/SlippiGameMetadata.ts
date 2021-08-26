import { Player } from "./Player";
import { lookupStageByValue, Stages } from "./Stages";
import { Result } from "../../../shared/Core/Result";

interface SlippiGameMetadataProps {
    date: Date;
    victoriousPlayer: Player;
    lraStart: boolean;
    timeout: boolean;
    stage: Stages;
    totalFrames: number;
}

export class SlippiGameMetadata {
    public static create(props: SlippiGameMetadataProps): Result<SlippiGameMetadata> {
        if ((props.totalFrames / 60) < 30) {
            return Result.fail('Game is too short');
        }

        if (lookupStageByValue(props.stage) === null) {
            return Result.fail('Illegal Stage');
        }

        if (props.lraStart && props.timeout) {
            return Result.fail('Game cannot be won by LRAStart and Timeout at the same time');
        }

        return Result.ok(new SlippiGameMetadata(props));
    }

    public constructor(public readonly props: SlippiGameMetadataProps) {}

    public getDate(): Date {
        return this.props.date;
    }

    public getStage(): Stages {
        return this.props.stage;
    }

    public getTotalFrames(): Number {
        return this.props.totalFrames;
    }

    public getWinner(): Player {
        return this.props.victoriousPlayer;
    }

    public wasLraStarted(): boolean {
        return this.props.lraStart;
    }

    public wasTimeout(): boolean {
        return this.props.timeout;
    }
}
