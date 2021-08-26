import { Result } from "../../../shared/Core/Result";

interface PlayerTagProps {
    tag: string;
}

export class PlayerTag {
    public static create(props: PlayerTagProps): Result<PlayerTag> {
        if (props.tag.length === 0) {
            return Result.fail('Tag cannot be empty');
        }

        return Result.ok(new PlayerTag(props));
    }

    constructor(public readonly props: PlayerTagProps) {}

    public isEmpty(): boolean {
        return this.props.tag === '';
    }

    public toString(): string {
        return this.props.tag;
    }
}
