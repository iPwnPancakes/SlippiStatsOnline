import { UseCase } from "../../../../../shared/Core/UseCase";
import { GetGamesByTagDTO } from "./GetGamesByTagDTO";
import { ISlippiGameRepository } from "../../../Repositories/ISlippiGameRepository";
import { PlayerTag } from "../../../Domain/PlayerTag";
import { GetGamesByTagResponse } from "./GetGamesByTagResponse";
import { left, right } from "../../../../../shared/Core/Either";
import { Result } from "../../../../../shared/Core/Result";

export class GetGamesByTag implements UseCase<GetGamesByTagDTO, Promise<GetGamesByTagResponse>> {
    constructor(private gameRepository: ISlippiGameRepository) {}

    public async execute(request: GetGamesByTagDTO): Promise<GetGamesByTagResponse> {
        const tag = PlayerTag.create({ tag: request.playerTag });

        if (tag.isFailure) {
            // TODO: Have PlayerTag's error in here rather than hardcode a string.
            return left(new Error('Invalid PlayerTag'));
        }

        const games = await this.gameRepository.getGamesByTag(tag.getValue());

        return right(Result.ok(games));
    }
}
