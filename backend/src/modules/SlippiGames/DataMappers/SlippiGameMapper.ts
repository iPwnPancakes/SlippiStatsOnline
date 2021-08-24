import { SlippiGame } from "../Domain/SlippiGame";
import { PlayerData } from "../Domain/PlayerData";
import { Stages } from "../Domain/Stages";
import { MoveTimeline } from "../Domain/MoveTimeline";

export class SlippiGameMapper {
    public toDomain(raw: any): SlippiGame | null {
        const player1Data = PlayerData.create({ tag: raw.player1Tag, character: raw.player1Character });
        const player2Data = PlayerData.create({ tag: raw.player2Tag, character: raw.player2Character });
        const moveTimeline = MoveTimeline.create({ moves: raw.moves ?? [] });

        if (player1Data.isFailure || player2Data.isFailure || !Stages[raw.stage] || moveTimeline.isFailure) {
            return null;
        }

        return new SlippiGame(
            raw.id,
            player1Data.getValue(),
            player2Data.getValue(),
            Stages[raw.stage],
            moveTimeline.getValue()
        );
    }

    public toPersistence(game: SlippiGame): any {
        return {
            _id: game.getID(),
            player1Tag: game.getPlayer1().getTag(),
            player1Character: game.getPlayer1().getCharacter().toString(),
            player2Tag: game.getPlayer2Data().getTag(),
            player2Character: game.getPlayer2Data().getCharacter().toString(),
            stage: game.getStage().toString(),
            moves: game.getMoveTimeline().props.moves.map(move => ({
                timestamp: move.getTimestamp(),
                input: {
                    analogStickPosition: move.getInput().getAnalogStickPosition(),
                    cStickPosition: move.getInput().getCStickPosition(),
                    buttons: move.getInput().getButtonsPressed()
                }
            }))
        };
    }
}
