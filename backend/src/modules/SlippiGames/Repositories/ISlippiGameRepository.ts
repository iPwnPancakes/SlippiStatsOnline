import { SlippiGame } from "../Domain/SlippiGame";
import { PlayerTag } from "../Domain/PlayerTag";

export interface ISlippiGameRepository {
    getGamesByTag(tag: PlayerTag): SlippiGame[];

    getTotalGameCount(): number;

    save(game: SlippiGame): void;
}
