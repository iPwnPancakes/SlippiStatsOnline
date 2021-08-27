import { SlippiGame } from "../Models/SlippiGame";
import { PlayerTag } from "../Models/PlayerTag";

export interface ISlippiGameRepository {
    getGamesByTag(tag: PlayerTag): Promise<SlippiGame[]>;

    getTotalGameCount(): Promise<number>;

    save(game: SlippiGame): Promise<string | number>;
}
