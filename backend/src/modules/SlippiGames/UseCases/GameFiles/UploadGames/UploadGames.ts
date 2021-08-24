import { UseCase } from "../../../../../shared/Core/UseCase";
import { UploadGamesDTO } from "./UploadGamesDTO";
import { Result } from "../../../../../shared/Core/Result";

export class UploadGames implements UseCase<UploadGamesDTO, Result<void>> {
    execute(request: UploadGamesDTO): Result<void> {
        return Result.fail();
    }
}
