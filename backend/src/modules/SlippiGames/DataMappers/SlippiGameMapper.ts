import { SlippiGame } from "../Domain/SlippiGame";
import { PlayerData } from "../Domain/PlayerData";
import { lookupStageByValue } from "../Domain/Stages";
import { lookupCharacterByValue } from "../Domain/Characters";

export class SlippiGameMapper {
    public toDomain(raw: any): SlippiGame | null {
        const p1Character = lookupCharacterByValue(raw.p1Character);
        const p2Character = lookupCharacterByValue(raw.p2Character);
        const stage = lookupStageByValue(raw.stage);
        const player1Data = PlayerData.create({ tag: raw.p1Tag, character: p1Character });
        const player2Data = PlayerData.create({ tag: raw.p2Tag, character: p2Character });

        if (player1Data.isFailure || player2Data.isFailure || !stage) {
            return null;
        }

        return new SlippiGame({
            id: raw.id,
            player1Data: player1Data.getValue(),
            player2Data: player2Data.getValue(),
            stage: stage
        });
    }

    public toPersistence(game: SlippiGame): any {
        return {
            _id: game.getID(),
            p1Tag: game.getPlayer1().getTag().toString(),
            p1Character: game.getPlayer1().getCharacter().toString(),
            p2Tag: game.getPlayer2Data().getTag().toString(),
            p2Character: game.getPlayer2Data().getCharacter().toString(),
            stage: game.getStage().toString()
        };
    }
}
