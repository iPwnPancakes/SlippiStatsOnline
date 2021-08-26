import { Either } from "../../../../../shared/Core/Either";
import { SlippiGame } from "../../../Domain/SlippiGame";
import { Result } from "../../../../../shared/Core/Result";

export type GetGamesByTagResponse = Either<Error, Result<SlippiGame[]>>;
