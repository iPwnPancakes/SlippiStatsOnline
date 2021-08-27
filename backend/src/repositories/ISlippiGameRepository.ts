import { SlippiGame } from "../models/SlippiGame";
import { PlayerTag } from "../models/PlayerTag";

export interface ISlippiGameRepository {
    getGamesByTag(tag: PlayerTag): Promise<SlippiGame[]>;

    getTotalGameCount(): Promise<number>;

    save(game: SlippiGame): Promise<string | number>;
}
