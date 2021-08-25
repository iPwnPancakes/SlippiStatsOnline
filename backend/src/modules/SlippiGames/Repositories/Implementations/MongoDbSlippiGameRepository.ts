import { ISlippiGameRepository } from "../ISlippiGameRepository";
import { SlippiGame } from "../../Domain/SlippiGame";
import { Connection } from 'mongoose';
import { GameModel } from '../../../../shared/Infrastructure/database/mongodb/models/GameModel';
import { PlayerTag } from "../../Domain/PlayerTag";
import { SlippiGameMapper } from "../../DataMappers/SlippiGameMapper";

export class MongoDbSlippiGameRepository implements ISlippiGameRepository {
    constructor(private connection: Connection, private slippiGameMapper: SlippiGameMapper) {
    }

    async getGamesByTag(tag: PlayerTag): Promise<SlippiGame[]> {
        const games = await GameModel.find({ p1Tag: tag.toString() }).exec();

        return Promise.resolve(games.map(game => {
            const result = this.slippiGameMapper.toDomain(game);

            if (result === null) {
                throw new Error('Invalid SlippiGame');
            }

            return result;
        }));
    }

    async getTotalGameCount(): Promise<number> {
        return GameModel.count({}).exec();
    }

    async save(game: SlippiGame): Promise<string | number> {
        return new GameModel(this.slippiGameMapper.toPersistence(game)).save().then(savedModel => savedModel._id);
    }
}
