import { PlayerTag } from "./PlayerTag";
import { Result } from "../../../shared/Core/Result";

interface PlayerProps {
    username: string;
    tag: PlayerTag;
}

export class Player {
    public static create(props: PlayerProps): Result<Player> {
        if (props.username.length === 0) {
            return Result.fail('Username cannot be empty');
        }

        return Result.ok(new Player(props));
    }

    public constructor(public readonly props: PlayerProps) {}

    get tag(): PlayerTag {
        return this.props.tag;
    }

    get username(): string {
        return this.props.username;
    }

    public isEqual(otherPlayer: Player): boolean {
        return this.tag.toString() === otherPlayer.tag.toString() && this.username === otherPlayer.username;
    }
}
