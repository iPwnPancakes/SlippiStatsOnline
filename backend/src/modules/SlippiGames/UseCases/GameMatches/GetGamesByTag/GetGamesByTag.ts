import { UseCase } from "../../../../../shared/Core/UseCase";
import { GetGamesByTagDTO } from "./GetGamesByTagDTO";
import { SlippiGame } from "../../../Domain/SlippiGame";
import { ISlippiGameRepository } from "../../../Repositories/ISlippiGameRepository";
import { PlayerTag } from "../../../Domain/PlayerTag";

export class GetGamesByTag implements UseCase<GetGamesByTagDTO, SlippiGame[]> {
    constructor(private gameRepository: ISlippiGameRepository) {}

    public execute(request: GetGamesByTagDTO): SlippiGame[] {
        const tag = new PlayerTag(request.playerTag);

        return this.gameRepository.getGamesByTag(tag);
    }
}
