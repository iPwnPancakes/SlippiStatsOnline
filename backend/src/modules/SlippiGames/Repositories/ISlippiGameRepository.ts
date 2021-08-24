import { SlippiGame } from "../Domain/SlippiGame";
import { PlayerTag } from "../Domain/PlayerTag";

export interface ISlippiGameRepository {
    getGamesByTag(tag: PlayerTag): Promise<SlippiGame[]>;

    getTotalGameCount(): Promise<number>;

    save(game: SlippiGame): Promise<string | number>;
}
