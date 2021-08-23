import { ISlippiGameRepository } from "../ISlippiGameRepository";
import { SlippiGame } from "../../Domain/SlippiGame";
import { Connection } from 'mongoose';
import { GameModel } from '../../../../shared/Infrastructure/database/mongodb/models/mongo-config';
import { PlayerTag } from "../../Domain/PlayerTag";

export class MongoDbSlippiGameRepository implements ISlippiGameRepository {
    constructor(private connection: Connection) {
    }

    getGamesByTag(tag: PlayerTag): SlippiGame[] {
        return GameModel.find({ player1: tag.getTag() });
    }

    getTotalGameCount(): number {
        return GameModel.count({});
    }

    save(game: SlippiGame): void {
        const model = GameModel.save({
            _id: game.getID(),
            player1: game.getPlayer1().getTag(),
            player2: game.getPlayer2Data().getTag(),
            stage: game.getStage().toString(),
        });
    }
}
