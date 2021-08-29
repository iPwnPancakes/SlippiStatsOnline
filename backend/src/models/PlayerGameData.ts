import { Characters } from "./Characters";
import { Result } from "../core/Result";
import { Player } from "./Player";

interface PlayerGameDataProps {
    player: Player;
    character: Characters;
    stocksTaken: Number;
    stocksRemaining: Number;
    apm: Number;
    totalPercentDamage: Number;
    totalOpenings: Number;
    totalNeutralInteractionsWon: Number;
    totalNeutralInteractionsLost: Number;
    totalSuccessfulConversions: Number;
    totalMissedConversions: Number;
    totalCounterHits: Number;
    totalNegativeCounterHits: Number;
    totalBeneficialTrades: Number;
    totalNegativeTrades: Number;
}

export class PlayerGameData {
    public static create(props: PlayerGameDataProps): Result<PlayerGameData> {
        if (!props.character) {
            return Result.fail('Invalid character');
        }

        return Result.ok(new PlayerGameData(props));
    }

    private constructor(public readonly props: PlayerGameDataProps) {
    }

    public getPlayer(): Player {
        return this.props.player;
    }

    public getCharacter(): Characters {
        return this.props.character;
    }
}
