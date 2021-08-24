import { Characters } from "./Characters";
import { Result } from "../../../shared/Core/Result";

interface PlayerDataProps {
    tag: string;
    character: Characters;
}

export class PlayerData {
    public static create(props: PlayerDataProps): Result<PlayerData> {
        if (!props.tag) {
            return Result.fail('Tag is required');
        }

        if (!Characters[props.character]) {
            return Result.fail('Invalid character');
        }

        return Result.ok(new PlayerData(props));
    }

    private constructor(private props: PlayerDataProps) {
    }

    public getTag(): string {
        return this.props.tag;
    }

    public getCharacter(): Characters {
        return this.props.character;
    }
}
